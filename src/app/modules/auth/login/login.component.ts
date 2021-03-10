import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserAccountRedirectService } from '@services/user-account-redirect/user-account-redirect.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { FailedResponse, UserLoginRequest } from '@modules/auth/models/authentication';

@Component({
  selector: 'arf-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {
  @Output() loading: EventEmitter<boolean> = new EventEmitter(false);
  private readonly loadingSubject = new BehaviorSubject(false);
  readonly loading$: Observable<boolean>;
  readonly loginForm = this.formBuilder.group({
    usernameOrEmail: [ null ],
    password: [ null ]
  });

  get usernameOrEmail() {
    return this.loginForm.get('usernameOrEmail');
  }

  get password() {
    return this.loginForm.get('password');
  }

  constructor(
    private formBuilder: FormBuilder,
    private userAccountRedirect: UserAccountRedirectService
  ) {
    this.loading$ = this.loadingSubject.asObservable();
    this.usernameOrEmail.setValidators([ Validators.required ]);
    this.password.setValidators([ Validators.required ]);
  }

  login() {
    this.setLoading(true);
    const userLoginRequest: UserLoginRequest = {
      usernameOrEmail: this.usernameOrEmail.value,
      password: this.password.value
    };
    this.userAccountRedirect.login(userLoginRequest)
      .pipe(take(1))
      .subscribe(_ => {
        this.setLoading(false);
      }, ({ error }: HttpErrorResponse) => {
        const errors: FailedResponse = { errors: error?.errors ?? []  };
        this.setLoading(false);
      });
  }

  private setLoading(loading: boolean) {
    this.loadingSubject.next(loading);
    this.loading.emit(loading);
  }
}
