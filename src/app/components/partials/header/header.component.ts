import { AuthService } from './../../../services/auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public isAuthenticated: boolean = false;
  private authListener: Subscription;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authListener = this.authService.authStatus.subscribe(
      res => {
        this.isAuthenticated = res;
        console.log("HERE NAV => ",this.isAuthenticated);
      },
      err => console.error(err)
    );
  }

  logout(): void {
    this.authService.signout();
  }

  ngOnDestroy(): void  {
    this.authListener.unsubscribe();
  }

}
