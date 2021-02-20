import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { Observable } from 'rxjs';
import { APP_ROUTES } from 'src/app/models/routes';

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
    private authService: AuthService) {
    this.usernameOrEmail.setValidators([ Validators.required ]);
    this.password.setValidators([ Validators.required ]);
    this.loading$ = this.authService.authLoading$.asObservable();
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    const usernameOrEmail = this.usernameOrEmail.value.trim();
    const password = this.password.value.trim();
    this.authService.userLogin({ usernameOrEmail, password })
      .subscribe(() => this.router.navigate([ APP_ROUTES.HOME.MAIN ]));
  }
}
