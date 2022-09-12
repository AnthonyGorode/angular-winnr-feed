import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Injectable } from '@angular/core';
import { filter, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreadCrumbService {

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute
  ) { }

  public getActiveRoute() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe( event => {
      console.log("HEY HERE => ",event);
    });
  }

  public returnActiveRoute() {
    console.log("HEY HERE => ",this.router.url);
  }


}
