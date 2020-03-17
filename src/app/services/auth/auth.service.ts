import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subject, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authStatus = new Subject<boolean>();
  public user: Observable<any>;

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    this.user = this.fireAuth.authState.pipe(
      switchMap(user => {
        if(user) return this.firestore.doc(`users/${user.uid}`).valueChanges();
        return of(null);
      })
    );
  }

  get authStatus(): Observable<boolean> {
    return this._authStatus;
  }

  public getAuthUid(): Observable<string> {
    return this.fireAuth.authState.pipe(map(res => res.uid));
  }

  public async signin(email: string,psw: string) {
    try {
      const result = await this.fireAuth.auth.signInWithEmailAndPassword(email,psw);
      this._authStatus.next(true);
      this.router.navigate(["/feeds"]);
    } catch (error) {
      console.error(error);
    }
  }

  public async signout() {
    try {
      await this.fireAuth.auth.signOut();
      this._authStatus.next(false);
      this.router.navigate(["/feeds"]); 
    } catch (error) {
      console.error(error);
    }
    
  }

  public isAuthenticated(): Observable<boolean> {
    return this.fireAuth.authState.pipe(map(res => {
      if(res && res.uid) return true;
      return false;
    }));
  }

  public isAdmin(): Observable<boolean> {
    return this.user.pipe(map(user => {
      if(user?.role && user?.role === "admin") return true;
      return false;
    }));
  }
}
