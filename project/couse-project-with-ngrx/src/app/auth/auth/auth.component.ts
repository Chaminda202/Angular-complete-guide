import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { SignUpRequest } from './sign-up-request';
import { SignUpResponse } from './sign-up-response';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceholderDirective } from 'src/app/shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver) { }

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
      authResponseObs = this.authService.signUp(authReq);
    }
    authResponseObs.subscribe(response => {
        this.isLoading = false;
        // console.log('Auth Response ' + JSON.stringify(response));
        this.router.navigate(['/recipes']);

      }, error => {
        this.isLoading = false;
        this.error = error;
        this.showErrorAlert(error);
        console.log(error);
      });

    authForm.reset();
  }

  onHideError() {
    this.error = null;
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    const alertCompnentFactory = this.componentFactoryResolver
                      .resolveComponentFactory(AlertComponent);
    const viewContainerRef = this.alertHost.viewContainerRef;
    viewContainerRef.clear();
    const alertComp = viewContainerRef.createComponent(alertCompnentFactory);
    alertComp.instance.message = message;
    this.closeSub = alertComp.instance.closeEvent.subscribe(() => {
      viewContainerRef.clear();
    });
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
