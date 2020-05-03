import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { take, exhaustMap, map } from 'rxjs/operators';

import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private store: Store<fromApp.AppState>) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('auth').pipe(
      take(1),
      map(authState => {
        return authState.user;
      }),
      exhaustMap(user => {
      if (!user) {
        return next.handle(req);
      }
      const modifiledRequest = req.clone(
        {
          params: new HttpParams().set('auth', user.token),
          headers: new HttpHeaders({'Content-Type': 'application/json'})
        });
      return next.handle(modifiledRequest);
    }));
  }
}
