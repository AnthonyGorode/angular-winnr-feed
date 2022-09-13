import { filter } from 'rxjs/operators';
import { Router, NavigationEnd, ActivatedRoute, NavigationStart } from '@angular/router';
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
  public isAdmin: boolean = false;
  public isLoadingAuth: boolean = false;

  private authListener: Subscription;
  private routeListener: Subscription;

  public path: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkIsAuthenticated();
    this.checkIsAdmin();

    this.routeListener = this.router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        this.path = event.url;
      }
    });
  }

  private checkIsAuthenticated(): void {
    this.isLoadingAuth = true;
    this.authListener = this.authService.user.subscribe(
      res => {
        if(res) this.isAuthenticated = true;
        else this.isAuthenticated = false;

      },
      err => {
        console.error(err);
      }
    );
  }

  private checkIsAdmin(): void {
    this.authService.isAdmin().subscribe(
      res => {
        this.isAdmin = res;
        this.isLoadingAuth = false;
      },
      err => {
        this.isLoadingAuth = false;
        console.error(err);
      }
    );
  }

  logout(): void {
    this.authService.signout();
  }

  ngOnDestroy(): void  {
    this.authListener.unsubscribe();
    this.routeListener.unsubscribe();
  }

}
