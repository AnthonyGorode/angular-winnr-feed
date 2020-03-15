import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private httpOptions: any;
  private baseUrl: string = "http://localhost:5000/winnr-feed/us-central1/winnr_manage_users/api/users";

  constructor(
    private firestore: AngularFirestore,
    private fireauth: AngularFireAuth,
    private http: HttpClient,
  ) {
    this.initHeaders();
  }

  private initHeaders(): void {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json'
      })
    };
  }

  public getAllUsers(): Observable<any> {
    return this.firestore.collection("users").snapshotChanges();
  }

  public addUser(user: User): Observable<any> {
    const data = {uid: "", user};
    return this.http.post(
      this.baseUrl,
      data,
      this.httpOptions
    );
  }

  public removeUser(uid: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${uid}`,this.httpOptions);
  }

  public sendResetPassword(email: string): void {
    this.fireauth.auth.sendPasswordResetEmail(email);
  }
  
}
