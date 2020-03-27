import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { SignUpResponse } from './sign-up-response';
import { SignUpRequest } from './sign-up-request';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSub = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  constructor(private http: HttpClient, private router: Router) {}

  signUp(request: SignUpRequest): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCPuJISXkgY3sszspl9K0XmG_4-YQwrYG0',
      request,
      {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      }
    ).pipe(catchError(this.handleError), tap(
      resp => this.authenticatedUserDetails(resp.email, resp.localId, resp.idToken, +resp.expiresIn)
    ));
  }

  login(request: SignUpRequest): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCPuJISXkgY3sszspl9K0XmG_4-YQwrYG0',
      request,
      {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      }
    ).pipe(catchError(this.handleError), tap(
      resp => this.authenticatedUserDetails(resp.email, resp.localId, resp.idToken, +resp.expiresIn)
      )
    );
  }

  logout() {
    this.userSub.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleError(errorRespo: HttpErrorResponse) {
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
    return throwError(errorMsg);
  }

  autoLogin() {
    const user: {
      email: string,
      userId: string,
      _token: string,
      _tokenExpirationDate: Date
    } = JSON.parse(localStorage.getItem('userData'));

    if (!user) {
      return;
    }
    const loadUser = new User(
      user.email,
      user.userId,
      user._token,
      new Date(user._tokenExpirationDate)
    );
    this.userSub.next(loadUser);
    const remainingDuration = new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
    this.autoLogout(remainingDuration);
  }

  private authenticatedUserDetails(email: string, loacaId: string, token: string, tokenExpire: number) {
    const expireDate = new Date(new Date().getTime() + tokenExpire * 1000 );
    const user = new User(email, loacaId, token, expireDate);
    this.userSub.next(user);
    this.autoLogout(tokenExpire * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
