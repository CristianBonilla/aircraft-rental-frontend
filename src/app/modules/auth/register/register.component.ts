import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControlOptions, FormBuilder, Validators } from '@angular/forms';
import { patternValidator } from '@helpers/validators/custom.validator';
import { passwordMatchValidator } from '@helpers/validators/password.validator';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { FailedResponse, UserRegisterRequest } from '@modules/auth/models/authentication';
import { HttpErrorResponse } from '@angular/common/http';
import { UserAccountRedirectService } from '@services/user-account-redirect/user-account-redirect.service';

@Component({
  selector: 'arf-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent {
  @Output() loading: EventEmitter<boolean> = new EventEmitter(false);
  private readonly loadingSubject = new BehaviorSubject(false);
  readonly loading$: Observable<boolean>;
  private readonly controlOptions: AbstractControlOptions = {
    validators: [ passwordMatchValidator ]
  };
  readonly registerForm = this.formBuilder.group({
    username: [ null ],
    email: [ null ],
    password: [ null ],
    confirmPassword: [ null ],
    firstName: [ null ],
    lastName: [ null ]
  }, this.controlOptions);

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  constructor(
    private formBuilder: FormBuilder,
    private userAccountRedirect: UserAccountRedirectService
  ) {
    this.loading$ = this.loadingSubject.asObservable();
    this.username.setValidators([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20)
    ]);
    this.email.setValidators([ Validators.required ]);
    this.password.setValidators([
      Validators.required,
      patternValidator(/[A-Z]/, { hasCapitalCase: true }),
      patternValidator(/[a-z]/, { hasSmallCase: true }),
      // check whether the entered password has a lower and upper case letter
      // check whether the entered password has a special character
      patternValidator(/[ £`~!¡¿@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { hasSpecialCharacters: true }),
      Validators.minLength(10)
    ]);
    this.confirmPassword.setValidators([ Validators.required ]);
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
  }

  register() {
    this.setLoading(true);
    const userRegisterRequest: UserRegisterRequest = {
      username: this.username.value,
      password: this.password.value,
      email: this.email.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      role: null
    };
    this.userAccountRedirect.register(userRegisterRequest)
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
