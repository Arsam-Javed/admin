import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';

@Injectable()
export class PageAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot) {
    let roles = route.data["roles"] as Array<string>;
    let t=localStorage.getItem('user_token');
    if (t) {
      let jwtHelper = new JwtHelper();
      let jwt = jwtHelper.decodeToken(t);
      return (roles.indexOf(jwt.r) != -1);
    }

    this.router.navigate(['login']);
    return false;

  }
}
