import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { AuthorizationService } from '@services/authorization/authorization.service';
import { IdentityService } from '@services/identity/identity.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, filter, take } from 'rxjs/operators';
import { APP_ROUTES } from 'src/app/models/routes';
import { FailedResponse, UserLoginRequest } from '../models/authentication';

@Component({
  selector: 'arf-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {
  @Output() loading: EventEmitter<boolean> = new EventEmitter(false);

  readonly loginForm = this.formBuilder.group({
    usernameOrEmail: [ '' ],
    password: [ '' ]
  });
  private readonly loadingSubject = new BehaviorSubject(false);
  readonly loading$: Observable<boolean>;

  get usernameOrEmail() {
    return this.loginForm.get('usernameOrEmail');
  }

  get password() {
    return this.loginForm.get('password');
  }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private identity: IdentityService,
    private authorization: AuthorizationService
  ) {
    this.usernameOrEmail.setValidators([ Validators.required ]);
    this.password.setValidators([ Validators.required ]);
    this.loading$ = this.loadingSubject.asObservable();
  }

  login() {
    this.setLoading(true);
    const userLoginRequest: UserLoginRequest = {
      usernameOrEmail: this.usernameOrEmail.value,
      password: this.password.value
    };
    this.identity.userLogin(userLoginRequest)
      .pipe(delay(3000), take(1))
      .subscribe(userAccount => {
        this.router.navigate([ APP_ROUTES.HOME.MAIN ]);
        this.authorization.loadRoleAndPermissions(userAccount);
        this.loginNavigationEnd();
      }, ({ error }: HttpErrorResponse) => {
        const errors: FailedResponse = { errors: error?.errors ?? []  };

        this.setLoading(false);
      });
  }

  private loginNavigationEnd() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      take(1)
    ).subscribe(_ => this.setLoading(false));
  }

  private setLoading(loading: boolean) {
    this.loadingSubject.next(loading);
    this.loading.emit(loading);
  }
}
