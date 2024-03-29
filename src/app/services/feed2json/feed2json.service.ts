import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MainFeed } from 'src/app/models/feed-model/main-feed.model';
import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable({
  providedIn: 'root'
})
export class Feed2jsonService {

  private awsUrl: string = "http://feed-api-parser.eu-west-3.elasticbeanstalk.com/api/feed";
  private firebaseUrl: string = "https://us-central1-winnr-feed.cloudfunctions.net/parser_feeds_api/api/feed";
  private cloudRunUrl: string = 'https://api-parser-xml-i6qw6vuwmq-ew.a.run.app/api/feed';

  private options: object;

  constructor(
    private http: HttpClient,
    private functions: AngularFireFunctions
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
    return this.http.get<MainFeed>(`${this.cloudRunUrl}?url_feed=${url}`);
  }

  getFeedsArticles(url: string): Observable<MainFeed> {
    return this.http.get<MainFeed>(`${this.cloudRunUrl}?url_feed=${url}`,this.options)
            .pipe(
              map(this.extractFeeds),
              catchError(this.handleError)
            );
  }

  // testUrl(url: string): Observable<MainFeed | any> {
  //   const callable = this.functions.httpsCallable('onCallParserXml');
  //   return callable({url_feed: url});
  //   // return this.http.get<MainFeed>(`${this.cloudRunUrl}?url_feed=${url}`);
  // }

  // getFeedsArticles(url: string): Observable<MainFeed> {
  //   const callable = this.functions.httpsCallable('onCallParserXml');
  //   return callable({url_feed: url});
  //   // .pipe(
  //   //   map(this.extractFeeds),
  //   //   catchError(this.handleError)
  //   // );
  //   // return this.http.get<MainFeed>(`${this.cloudRunUrl}?url_feed=${url}`);
  // }

  private extractFeeds(data: MainFeed): MainFeed {
    return data;
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
