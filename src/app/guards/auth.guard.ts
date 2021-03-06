import { map } from 'rxjs/operators';
import { AuthService } from './../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree  } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.isAuthenticated().pipe(map(res => {
      if(res) return true;
      else {
        this.router.navigate(['/auth', 'signin']);
        return false;
      }
    }));
  }

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }
}
