import { Component, OnInit, OnDestroy } from '@angular/core';
import { Feed } from 'src/app/models/feed-model/feed.model';
import { Article } from 'src/app/models/feed-model/article.model';
import { Subscription } from 'rxjs';
import { FeedsService } from 'src/app/services/feeds/feeds.service';
import { Feed2jsonService } from 'src/app/services/feed2json/feed2json.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-feeds-user',
  templateUrl: './feeds-user.component.html',
  styleUrls: ['./feeds-user.component.scss']
})
export class FeedsUserComponent implements OnInit, OnDestroy {

  public feed: Feed;
  public articles: Array<Article>;
  public feedsList: Array<{id: string, feed: Feed}> = [];
  public feedsUser: Array<Feed> = [];
  public isLoading: boolean = false;

  public isAuthenticated: boolean = false;
  private authListener: Subscription;

  private uidUser: string;

  constructor(
    private feedsService: FeedsService,
    private feed2jsonService: Feed2jsonService,
    private authService: AuthService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.checkIsAuthenticated();
    this.getAuthUid();

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

  private getAuthUid(): void {
    this.authService.getAuthUid().subscribe(
      uid => this.uidUser = uid,
      err => console.error(err)
    );
  }

  public getFeeds(): void {
    this.authService.user.subscribe(
      user => {
        const feeds = user.feeds;


        this.feedsList = [];
        this.feedsUser = [];
        feeds.map((feed,index) => {
          this.feedsList.push({
            "id": index,
            "feed": feed
          });
          this.feedsUser.push(feed);
        });

      }, err => console.error(err))

  }

  public getFeedArticles(url: string): void {
    this.isLoading = true;
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
        this.isLoading = false;
        console.error(err);
      }
    );
  }

  public deleteRss(event: Event, index: number): void {
    event.stopPropagation();
    this.feedsUser.splice(index, 1);
    this.usersService.updateFeedUser(this.feedsUser, this.uidUser);
  }

  ngOnDestroy(): void {
    this.authListener.unsubscribe();
  }

}
