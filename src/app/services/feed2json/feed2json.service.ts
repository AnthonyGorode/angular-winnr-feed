import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MainFeed } from 'src/app/models/feed-model/main-feed.model';

@Injectable({
  providedIn: 'root'
})
export class Feed2jsonService {

  private awsUrl: string = "http://feed-api-parser.eu-west-3.elasticbeanstalk.com/api/feed";
  private firebaseUrl: string = "https://us-central1-winnr-feed.cloudfunctions.net/parser_feeds_api/api/feed";

  private options: Object;

  constructor(
    private http: HttpClient
  ) {
    // this.options = {
    //   headers: new HttpHeaders({ 
    //     'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    //   })
    // };
  }

  /**
   * this method check if this url is a valid rss feed
   * @param url Rss feed url
   */
  testUrl(url: string): Observable<MainFeed | any> {
    return this.http.get<MainFeed>(`${this.awsUrl}?url_feed=${url}`);
  }

  getFeedsArticles(url: string): Observable<MainFeed> {
    return this.http.get<MainFeed>(`${this.awsUrl}?url_feed=${url}`,this.options)
            .pipe(
              map(this.extractFeeds),
              catchError(this.handleError)
            );
  }

  private extractFeeds(data: MainFeed): MainFeed {
    return data;
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
