import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IdentityService } from '@services/identity/identity.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { APP_ROUTES } from 'src/app/models/routes';
import { UserLoginRequest } from '../models/authentication';

@Component({
  selector: 'arf-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {
  readonly loginForm = this.formBuilder.group({
    usernameOrEmail: [ '' ],
    password: [ '' ]
  });
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
    private identity: IdentityService
  ) {
    this.usernameOrEmail.setValidators([ Validators.required ]);
    this.password.setValidators([ Validators.required ]);
    this.loading$ = this.identity.loading$;
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    const userLoginRequest: UserLoginRequest = {
      usernameOrEmail: this.usernameOrEmail.value,
      password: this.password.value
    };
    this.identity.userLogin(userLoginRequest)
      .pipe(take(1))
      .subscribe(() => this.router.navigate([ APP_ROUTES.HOME.MAIN ]));
  }
}
