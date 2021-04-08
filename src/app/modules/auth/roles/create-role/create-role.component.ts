import { AfterViewInit, Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { RefreshRoles, REFRESH_ROLES } from '@core/providers/refresh.provider';
import { requiredMultiValidator } from '@helpers/validators/custom.validator';
import { onlyLetters } from '@helpers/validators/formats.validator';
import { ALL_PERMISSIONS } from '@modules/auth/models/permission';
import { RoleRequest, RoleState } from '@modules/auth/models/role';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IdentityService } from '@services/identity/identity.service';
import { CustomizeDropdownSelect, DropdownSelectStyle } from '@shared/components/dropdown-select';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { DEFAULT_MODAL_OPTIONS } from 'src/app/models/modal';
import { APP_ROUTES } from 'src/app/models/routes';

const { HOME: ROUTES } = APP_ROUTES;

@Component({
  selector: 'arf-create-role',
  templateUrl: './create-role.component.html',
  styles: []
})
export class CreateRoleComponent implements AfterViewInit {
  @ViewChild('roleTemplate')
  readonly roleTemplate: TemplateRef<NgbActiveModal>;
  private roleModal: NgbModalRef = null;
  private readonly loadingSubject = new BehaviorSubject(false);
  readonly loading$: Observable<boolean>;
  readonly roleForm = this.formBuilder.group({
    name: [ '' ],
    displayName: [ '' ],
    permissions: [ [] ]
  });
  dropdownPermissionsSelect: CustomizeDropdownSelect = {
    data: [],
    style: DropdownSelectStyle.Info,
    options: {
      noneSelectedText: 'No hay permisos seleccionados...',
      selectedTextFormat: 'count > 2',
      countSelectedText: '{0} Permisos seleccionados',
      size: 5
    }
  };

  get name() {
    return this.roleForm.get('name');
  }

  get displayName() {
    return this.roleForm.get('displayName');
  }

  get permissions() {
    return this.roleForm.get('permissions');
  }

  constructor(
    private modal: NgbModal,
    private formBuilder: FormBuilder,
    private identity: IdentityService,
    @Inject(REFRESH_ROLES) private refresh: RefreshRoles,
    private router: Router
  ) {
    this.loading$ = this.loadingSubject.asObservable();
    this.name.setValidators([
      Validators.required,
      onlyLetters,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]);
    this.displayName.setValidators([
      Validators.required,
      onlyLetters,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]);
    this.permissions.setValidators([ requiredMultiValidator ]);
    this.buildDropdownSelectItems();
    this.changeDropdownStyle(this.permissions, this.dropdownPermissionsSelect);
  }

  ngAfterViewInit() {
    this.roleModal = this.modal.open(this.roleTemplate, DEFAULT_MODAL_OPTIONS);
    this.actionOnCompletion();
    this.onPopState();
  }

  createRole(active: NgbActiveModal) {
    this.loadingSubject.next(true);
    const roleRequest: RoleRequest = {
      name: this.name.value,
      displayName: this.displayName.value,
      permissionsIDs: this.permissions.value
    };
    this.identity.createRole(roleRequest)
      .pipe(take(1))
      .subscribe(_ => active.close(RoleState.CREATED));
  }

  setLoading(loading: boolean) {
    this.loadingSubject.next(loading);
  }

  dismiss(active: NgbActiveModal) {
    active.dismiss(null);
  }

  private actionOnCompletion() {
    this.roleModal.closed.pipe(
      take(1),
      filter<RoleState>(state => state === RoleState.CREATED)
    ).subscribe(_ => this.refresh.dispatch());
    this.roleModal.hidden.pipe(take(1))
      .subscribe(_ => this.router.navigate([ ROUTES.ROLES.MAIN ]));
  }

  private buildDropdownSelectItems() {
    const dropdownPermissionItems = this.dropdownPermissionsSelect.data;
    for (const { id, displayName } of ALL_PERMISSIONS) {
      dropdownPermissionItems.push({
        value: id,
        text: displayName
      });
    }
  }

  private changeDropdownStyle(
    control: AbstractControl,
    dropdownSelect: CustomizeDropdownSelect,
    original = DropdownSelectStyle.Info
  ) {
    control.valueChanges.subscribe(() => {
      const { invalid, dirty, touched } = control;
      if (invalid && (dirty || touched)) {
        dropdownSelect.style = DropdownSelectStyle.Danger;

        return;
      }
      dropdownSelect.style = original;
    });
  }

  private onPopState() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart && !!event.restoredState),
      take(1)
    ).subscribe(_ => this.roleModal.close(null));
  }
}
