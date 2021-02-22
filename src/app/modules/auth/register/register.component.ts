import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { checkPassword } from '@core/validators/check-password.validator';
import { IdentityService } from '@services/identity/identity.service';
import { combineLatest, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { APP_ROUTES } from 'src/app/models/routes';
import { UserRegisterRequest } from '../models/authentication';

@Component({
  selector: 'arf-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent {
  @Input() roleCustom = false;

  readonly registerForm = this.formBuilder.group({
    username: [ '' ],
    password: [ '' ],
    confirmPassword: [ '' ],
    email: [ '' ],
    firstName: [ '' ],
    lastName: [ '' ],
    role: [ '' ]
  }, { validators: checkPassword });
  readonly loading$: Observable<boolean>;
  readonly roles = of([
    { name: 'AdminUser', displayName: 'Administrador' },
    { name: 'CommonUser', displayName: 'Usuario' }
  ]);

  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get role() {
    return this.registerForm.get('role');
  }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private identity: IdentityService) {
    this.username.setValidators([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20)
    ]);
    this.password.setValidators([
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(30)
    ]);
    this.confirmPassword.setValidators([
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(30)
    ]);
    this.email.setValidators([
      Validators.required,
      Validators.email
    ]);
    this.firstName.setValidators([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]);
    this.lastName.setValidators([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]);
    if (!!this.roleCustom) {
      this.role.setValidators([ Validators.required ]);
    } else {
      this.role.setValue(null);
    }
    this.loading$ = this.identity.loading$;
  }

  register() {
    if (this.registerForm.invalid) {
      return;
    }
    const userRegisterRequest: UserRegisterRequest = {
      username: this.username.value,
      password: this.password.value,
      email: this.email.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      role: this.role.value
    };
    combineLatest([
      this.identity.isAuthenticated(),
      this.identity.userRegister(userRegisterRequest)
    ]).pipe(take(1))
      .subscribe(([ authenticated ]) => {
        if (!authenticated) {
          this.router.navigate([ APP_ROUTES.HOME.MAIN ]);
        }
      });
  }
}
