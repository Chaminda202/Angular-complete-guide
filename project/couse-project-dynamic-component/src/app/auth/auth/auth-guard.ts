import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  /*
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean|UrlTree>|Promise<boolean>|boolean {
    return this.authService.userSub.pipe(map(user => {
      return !!user;
    }), tap( auth => {
      if (!auth) {
        this.router.navigate(['/auth']);
      }
    }));
  }
  */
 canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean|UrlTree>|Promise<boolean>|boolean {
  return this.authService.userSub.pipe(take(1), map(user => {
    const isAuth = !!user;
    if (isAuth) {
      return true;
    }
    return this.router.createUrlTree(['/auth']);
  }));
}
}
