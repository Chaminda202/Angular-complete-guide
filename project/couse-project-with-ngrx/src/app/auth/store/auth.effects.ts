import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


import { SignUpResponse } from './../auth/sign-up-response';
import * as AuthActions from './auth.actions';
import { User } from '../auth/user.model';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environments/environment';



const handleAuthentication = (email: string,
                              loacaId: string,
                              token: string,
                              tokenExpire: string) => {
    const expireDate = new Date(new Date().getTime() + +tokenExpire * 1000 );
    const user = new User(email, loacaId, token, expireDate);
    localStorage.setItem('userData', JSON.stringify(user));
    return new AuthActions.AuthenticateSuccess({
      email,
      loacaId,
      token,
      tokenExpire: expireDate
    });
  };

const handleError = (errorRespo: any) => {
  let errorMsg = 'Unknown error occured';
  if (errorRespo. error || errorRespo. error.error) {
    switch (errorRespo.error.error.message) {
      case 'EMAIL_EXISTS':
          errorMsg = 'The email address is already in use by another account';
          break;
      case 'EMAIL_NOT_FOUND':
        errorMsg = 'There is no user record corresponding to this identifier';
        break;
      default:
        errorMsg = 'Invalid email address or password';
        break;
    }
  }
  return of(new AuthActions.AuthenticateFail(errorMsg));
};

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private http: HttpClient,
              private router: Router, private authService: AuthService) {}

  @Effect()
  authSignUp = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((singupData: AuthActions.SignupStart) => {
      return this.http.post<SignUpResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
        {
          email: singupData.payload.email,
          password: singupData.payload.password,
          returnSecureToken: true
        },
        {
          headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
      ).pipe(
        tap(resData => {
          this.authService.setLogoutTimer(+resData.expiresIn * 1000);
        }),
        map(resData => {
          return handleAuthentication(resData.email, resData.localId, resData.idToken, resData.expiresIn);
        }),
        catchError(errorRespo => {
          return handleError(errorRespo);
        })
      );
    })
  );

  // Observable stream according to effect type
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http.post<SignUpResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
        {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        },
        {
          headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
      ).pipe(
        tap(resData => {
          this.authService.setLogoutTimer(+resData.expiresIn * 1000);
        }),
        map(resData => {
          return handleAuthentication(resData.email, resData.localId, resData.idToken, resData.expiresIn);
        }),
        catchError(errorRespo => {
          return handleError(errorRespo);
        })
      );
    })
  );

  @Effect({dispatch: false})
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap( () => {
      this.router.navigate(['/']);
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const user: {
        email: string,
        userId: string,
        _token: string,
        _tokenExpirationDate: string
      } = JSON.parse(localStorage.getItem('userData'));

      if (!user) {
        return {type: 'DUMMY'};
      }
      const loadUser = new User(
        user.email,
        user.userId,
        user._token,
        new Date(user._tokenExpirationDate)
      );

      if (loadUser.token) {
        const remainingDuration = new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
        this.authService.setLogoutTimer(remainingDuration);
        return new AuthActions.AuthenticateSuccess({
          email: loadUser.email,
          loacaId: loadUser.userId,
          token: loadUser.token,
          tokenExpire:  new Date(user._tokenExpirationDate)
        });
      }
      return {type: 'DUMMY'};
    })
  );

  @Effect({dispatch: false})
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap( () => {
      localStorage.removeItem('userData');
      this.router.navigate(['/auth']);
    })
  );
}
