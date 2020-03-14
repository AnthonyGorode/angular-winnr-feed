import { Feed } from './../../../models/feed-model/feed.model';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Article } from 'src/app/models/feed-model/article.model';

@Component({
  selector: 'app-feed-articles',
  templateUrl: './feed-articles.component.html',
  styleUrls: ['./feed-articles.component.scss']
})
export class FeedArticlesComponent implements OnInit,OnChanges {

  @Input() feed: Feed;
  @Input() articles: Array<Article> = [];

  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnChanges(): void {
    console.log(this.articles);
  }

  public loadArticles() {}

}
