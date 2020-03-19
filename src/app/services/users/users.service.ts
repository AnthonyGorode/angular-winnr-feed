import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private httpOptions: any;
  private baseUrl: string = "https://us-central1-winnr-feed.cloudfunctions.net/winnr_manage_users/api/users";

  constructor(
    private firestore: AngularFirestore,
    private fireauth: AngularFireAuth,
    private firefunction: AngularFireFunctions
  ) { }

  private initHeaders(): void {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json'
      })
    };
  }

  public getAllUsers(): Observable<any> {
    return this.firestore.collection("users", ref => ref.where("role","==","user")).snapshotChanges();
  }

  public getUserByUid(uid: string): Observable<any> {
    return this.firestore.doc(`users/${uid}`).snapshotChanges();
  }

  public updateFeedUser(feeds: Array<any>,uid: string): void {
    this.firestore.doc(`users/${uid}`).update({
      feeds
    });
  }

  public addUser(user: User): Observable<any> {
    
    const add_new_user = this.firefunction.httpsCallable("add_new_user");
    return add_new_user(user);
  }

  public removeUser(uid: string): Observable<any> {
    const remove_user = this.firefunction.httpsCallable("remove_user");
    return remove_user(uid);
  }

  public sendResetPassword(email: string): void {
    this.fireauth.auth.sendPasswordResetEmail(email);
  }
  
}
