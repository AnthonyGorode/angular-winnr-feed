import { Feed } from './../../models/feed-model/feed.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedsService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  public getAllFeeds(): Observable<any> {
    return this.firestore.collection("feeds").snapshotChanges();
  }

  public addFeed(feed: Feed): void {
    this.firestore.collection("feeds").add(feed);
  }

  public deleteFeed(uid: string): void {
    this.firestore.collection("feeds").doc(uid).delete();
  }

}
