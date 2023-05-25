import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!window.localStorage['token']) {
      if (
        state.url === '/app/profile' ||
        state.url === '/app/matches' ||
        state.url === '/app/match'
      ) {
        this.router.navigate(['/auth/login']);
        return false;
      } else {
        return true;
      }
    } else {
      if (route.url[0].path === 'auth' || route.url[0].path === 'auth') {
        this.router.navigate(['/app/index']);
        return false;
      } else {
        return true;
      }
    }
  }
}
