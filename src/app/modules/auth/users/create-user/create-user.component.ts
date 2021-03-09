import { AfterViewInit, Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControlOptions, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RefreshUsers, REFRESH_USERS } from '@core/providers/refresh.provider';
import { patternValidator } from '@helpers/validators/custom.validator';
import { emailValidator } from '@helpers/validators/formats.validator';
import { passwordMatchValidator } from '@helpers/validators/password.validator';
import { UserRegisterRequest, UserState } from '@modules/auth/models/authentication';
import { DefaultRoles } from '@modules/auth/models/role';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IdentityService } from '@services/identity/identity.service';
import { CustomizeDropdownSelect, DropdownSelectStyle } from '@shared/components/dropdown-select';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, mergeAll, take, toArray } from 'rxjs/operators';
import { DEFAULT_MODAL_OPTIONS } from 'src/app/models/modal';
import { APP_ROUTES } from 'src/app/models/routes';

const { HOME: ROUTES } = APP_ROUTES;

@Component({
  selector: 'arf-create-user',
  templateUrl: './create-user.component.html',
  styles: []
})
export class CreateUserComponent implements AfterViewInit {
  @ViewChild('userTemplate')
  readonly userTemplate: TemplateRef<NgbActiveModal>;
  private userModal: NgbModalRef;
  private readonly loadingSubject = new BehaviorSubject(false);
  readonly loading$: Observable<boolean>;
  private readonly controlOptions: AbstractControlOptions = {
    validators: [ passwordMatchValidator ]
  };
  readonly userForm = this.formBuilder.group({
    username: [ null ],
    email: [ null ],
    password: [ null ],
    confirmPassword: [ null ],
    firstName: [ null ],
    lastName: [ null ],
    role: [ null ]
  }, this.controlOptions);
  dropdownRoleSelect: CustomizeDropdownSelect = {
    data: [],
    style: DropdownSelectStyle.Info,
    options: {
      noneSelectedText: 'No hay un rol seleccionado...',
      size: 5
    }
  };

  get username() {
    return this.userForm.get('username');
  }

  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }

  get confirmPassword() {
    return this.userForm.get('confirmPassword');
  }

  get firstName() {
    return this.userForm.get('firstName');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }

  get role() {
    return this.userForm.get('role');
  }

  constructor(
    private formBuilder: FormBuilder,
    private modal: NgbModal,
    private router: Router,
    private identity: IdentityService,
    @Inject(REFRESH_USERS) private refresh: RefreshUsers
  ) {
    this.loading$ = this.loadingSubject.asObservable();
    this.username.setValidators([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20)
    ]);
    this.email.setValidators([
      Validators.required,
      emailValidator
    ]);
    this.password.setValidators([
      Validators.required,
      patternValidator(/[A-Z]/, { hasCapitalCase: true }),
      patternValidator(/[a-z]/, { hasSmallCase: true }),
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
    this.role.setValidators([ Validators.required ]);
    this.buildDropdownSelectItems();
  }

  ngAfterViewInit() {
    this.userModal = this.modal.open(this.userTemplate, DEFAULT_MODAL_OPTIONS);
    this.actionOnCompletion();
  }

  createUser(active: NgbActiveModal) {
    this.loadingSubject.next(true);
    const userRegisterRequest: UserRegisterRequest = {
      username: this.username.value,
      password: this.password.value,
      email: this.email.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      role: this.role.value
    };
    this.identity.createUser(userRegisterRequest)
      .pipe(take(1))
      .subscribe(_ => active.close(UserState.CREATED));
  }

  dismiss(active: NgbActiveModal) {
    active.dismiss(null);
  }

  private buildDropdownSelectItems() {
    const dropdownRoleItems = this.dropdownRoleSelect.data;
    this.identity.fetchRoles().pipe(
      take(1),
      mergeAll(),
      filter(({ name }) => name !== DefaultRoles.ADMIN_USER),
      toArray()
    ).subscribe(roles => {
      for (const { name, displayName } of roles) {
        dropdownRoleItems.push({
          value: name,
          text: displayName
        });
      }
    });
  }

  private actionOnCompletion() {
    this.userModal.closed.pipe(
      take(1),
      filter<UserState>(state => state === UserState.CREATED)
    ).subscribe(_ => this.refresh.dispatch());
    this.userModal.hidden.pipe(take(1))
      .subscribe(_ => this.router.navigate([ ROUTES.USERS.MAIN ]));
  }
}
