import { map } from 'rxjs/operators';
import { AuthService } from './../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree  } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.isAdmin().pipe(map(res => {
      if(res) return true;
      else {
        this.router.navigate(['/feeds']);
        return false;
      }
    }));
  }

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }
}
