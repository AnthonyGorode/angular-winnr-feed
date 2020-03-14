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

  getAllFeeds(): Observable<any> {
    return this.firestore.collection("feeds").snapshotChanges();
  }
}
