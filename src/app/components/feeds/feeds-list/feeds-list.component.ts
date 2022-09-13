import { AuthService } from './../../../services/auth/auth.service';
import { Feed2jsonService } from './../../../services/feed2json/feed2json.service';
import { Feed } from '../../../models/feed-model/feed.model';
import { FeedsService } from './../../../services/feeds/feeds.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Article } from 'src/app/models/feed-model/article.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-feeds-list',
  templateUrl: './feeds-list.component.html',
  styleUrls: ['./feeds-list.component.scss']
})
export class FeedsListComponent implements OnInit, OnDestroy {

  public feed: Feed;
  public articles: Array<Article>;
  public feedsList: Array<{id: string, feed: Feed}> = [];
  public isLoadingFeeds: boolean = false;
  public isLoading: boolean = false;
  public currentFeedFocused: number;

  public isAuthenticated: boolean = false;
  public isAdmin: boolean = false;
  private authListener: Subscription;

  constructor(
    private feedsService: FeedsService,
    private feed2jsonService: Feed2jsonService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.checkIsAuthenticated();
    this.checkIsAdmin();

    this.getFeeds();
  }

  private checkIsAuthenticated(): void {
    this.authListener = this.authService.user.subscribe(
      res => {
        if(res) this.isAuthenticated = true;
        else this.isAuthenticated = false;
      },
      err => console.error(err)
    );
  }

  private checkIsAdmin(): void {
    this.authService.isAdmin().subscribe(
      res => this.isAdmin = res,
      err => console.error(err)
    );
  }

  public getFeeds(): void {
    this.isLoadingFeeds = true;
    this.feedsService.getAllFeeds().subscribe(
      res => {
        this.feedsList = [];
        res.map(doc => {
          this.feedsList.push({
            "id": doc.payload.doc.id,
            "feed": doc.payload.doc.data()
          });
        });

        this.isLoadingFeeds = false;

        if(this.feedsList.length) {
          const { feed } = this.feedsList[0];
          this.getFeedArticles(feed.url, 0);
        }
      },
      err => {
        this.isLoadingFeeds = false;
        console.error(err);
      }
    );
  }

  public getFeedArticles(url: string, index: number): void {
    this.isLoading = true;
    this.currentFeedFocused = index;
    this.feed2jsonService.getFeedsArticles(url).subscribe(
      res => {
        const parser = new DOMParser();
        res.items.map(feed => {
          let encodedStr = feed.title;
            let dom = parser.parseFromString(
              '<!doctype html><body>' + encodedStr,
              'text/html'
            );
            let decodedString = dom.body.textContent;
            feed.title = decodedString;
        });
        this.feed = res.feed;
        this.articles = res.items;
        this.isLoading = false;
      },
      err => {
        console.error(err);
        this.isLoading = false;
        this.currentFeedFocused = null;
      }
    );
  }

  public deleteRss(event: Event,uid: string): void {
    event.stopPropagation();
    this.feedsService.deleteFeed(uid);

    if(uid == this.feedsList[this.currentFeedFocused].id) {
      this.feed = null;
      this.articles = null;
    }
  }

  ngOnDestroy(): void {
    this.authListener.unsubscribe();
  }

}
