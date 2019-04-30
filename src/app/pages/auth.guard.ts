import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {  JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

      canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
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
      isLogin() {
          let t=localStorage.getItem('user_token');
          if (t) {
              return true;
          }
          this.router.navigate(['login']);
          return false;
      }
      role() {
        let t=localStorage.getItem('user_token');
        let jwtHelper = new JwtHelper();
        let jwt = jwtHelper.decodeToken(t);
        return jwt.r;
      }
      id() {
        let t=localStorage.getItem('user_token');
        let jwtHelper = new JwtHelper();
        let jwt = jwtHelper.decodeToken(t);
        return jwt.d;
      }
      profilepic() {
        let t=localStorage.getItem('user_token');
        let jwtHelper = new JwtHelper();
        let jwt = jwtHelper.decodeToken(t);
        return jwt.p;
      }
}
