import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { patternValidator, requiredMultiValidator } from '@helpers/validators/custom.validator';
import { ALL_PERMISSIONS } from '@modules/auth/models/permission';
import { RoleRequest, RoleState } from '@modules/auth/models/role';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IdentityService } from '@services/identity/identity.service';
import { CustomizeDropdownSelect, DropdownSelectStyle } from '@shared/dropdown-select';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'arf-create-role',
  templateUrl: './create-role.component.html',
  styles: []
})
export class CreateRoleComponent {
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
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private identity: IdentityService
  ) {
    this.loading$ = this.loadingSubject.asObservable();
    this.name.setValidators([
      Validators.required,
      patternValidator(/^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$/, { onlyLetters: true }),
      Validators.minLength(3),
      Validators.maxLength(30)
    ]);
    this.displayName.setValidators([
      Validators.required,
      patternValidator(/^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$/, { onlyLetters: true }),
      Validators.minLength(3),
      Validators.maxLength(50)
    ]);
    this.permissions.setValidators([ requiredMultiValidator ]);
    this.buildDropdownSelectItems();
    this.changeDropdownStyle(this.permissions, this.dropdownPermissionsSelect);
  }

  createRole() {
    this.loadingSubject.next(true);
    const roleRequest: RoleRequest = {
      name: this.name.value,
      displayName: this.displayName.value,
      permissionsIDs: this.permissions.value
    };
    this.identity.createRole(roleRequest)
      .pipe(take(1))
      .subscribe(_ => this.activeModal.close(RoleState.Created));
  }

  setLoading(loading: boolean) {
    this.loadingSubject.next(loading);
  }

  close() {
    this.activeModal.close(null);
  }

  private buildDropdownSelectItems() {
    const permissionsList = this.dropdownPermissionsSelect.data;
    for (const { id, displayName } of ALL_PERMISSIONS) {
      permissionsList.push({
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
}
