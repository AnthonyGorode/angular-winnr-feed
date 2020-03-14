import { Feed2jsonService } from './../../../services/feed2json/feed2json.service';
import { Feed } from '../../../models/feed-model/feed.model';
import { FeedsService } from './../../../services/feeds/feeds.service';
import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/feed-model/article.model';

@Component({
  selector: 'app-feeds-list',
  templateUrl: './feeds-list.component.html',
  styleUrls: ['./feeds-list.component.scss']
})
export class FeedsListComponent implements OnInit {

  public feed: Feed;
  public articles: Array<Article>;
  public feedsList: Array<{id: string, feed: Feed}> = [];

  constructor(
    private feedsService: FeedsService,
    private feed2jsonService: Feed2jsonService
  ) { }

  ngOnInit(): void {
    this.getFeeds();
  }

  public getFeeds(): void {
    this.feedsService.getAllFeeds().subscribe(
      res => {
        res.map(doc => {
          this.feedsList.push({
            "id": doc.payload.doc.id,
            "feed": doc.payload.doc.data()
          });
        });

        console.log(this.feedsList);
      },
      err => console.error(err)
    );
  }

  public getFeedArticles(url: string): void {
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
      },
      err => console.error(err)
    );
  }

  public deleteRss(event: Event,uid: string): void {
    event.stopPropagation();
    console.log(uid);
  }

}
