import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { SignUpRequest } from './sign-up-request';
import { SignUpResponse } from './sign-up-response';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    console.log(authForm.value);
    let authResponseObs: Observable<SignUpResponse> ;
    const authReq: SignUpRequest = {email: authForm.value.email,
      password: authForm.value.password,
      returnSecureToken: true};

    if (this.isLoginMode) {
      authResponseObs = this.authService.login(authReq);
    } else {
      /*
      this.isLoading = true;
      const authReq: SignUpRequest = {email: authForm.value.email,
        password: authForm.value.password,
        returnSecureToken: true};

      this.authService.signUp(authReq)
                .subscribe(response => {
                  this.isLoading = false;
                  console.log('Signup Response ' + JSON.stringify(response));
                }, errorRes => {
                  this.isLoading = false;
                  this.error = errorRes.error.error.message;
                  console.log(errorRes);
                });

      this.isLoading = true;
      const authReq: SignUpRequest = {email: authForm.value.email,
        password: authForm.value.password,
        returnSecureToken: true};

      this.authService.signUp(authReq)
                .subscribe(response => {
                  this.isLoading = false;
                  console.log('Signup Response ' + JSON.stringify(response));
                }, error => {
                  this.isLoading = false;
                  this.error = error;
                  console.log(error);
                });
       */
      authResponseObs = this.authService.signUp(authReq);
    }
    authResponseObs.subscribe(response => {
        this.isLoading = false;
        // console.log('Auth Response ' + JSON.stringify(response));
        this.router.navigate(['/recipes']);

      }, error => {
        this.isLoading = false;
        this.error = error;
        console.log(error);
      });

    authForm.reset();
  }

  onHideError() {
    this.error = null;
  }
}
