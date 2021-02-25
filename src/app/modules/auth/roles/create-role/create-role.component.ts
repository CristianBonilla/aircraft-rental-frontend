import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { patternValidator, requiredMultiValidator } from '@helpers/validators/custom.validator';
import { ALL_PERMISSIONS } from '@modules/auth/models/permission';
import { RoleRequest, RoleState } from '@modules/auth/models/role';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IdentityService } from '@services/identity/identity.service';
import { DropdownSelectItem, DropdownSelectOptions, DropdownSelectStyle } from '@shared/dropdown-select';
import { take } from 'rxjs/operators';

@Component({
  selector: 'arf-create-role',
  templateUrl: './create-role.component.html',
  styles: []
})
export class CreateRoleComponent {
  readonly roleForm = this.formBuilder.group({
    name: [ '' ],
    displayName: [ '' ],
    permissions: [ [] ]
  });
  readonly dropdownSelectOptions: DropdownSelectOptions = {
    noneSelectedText: 'No hay permisos seleccionados...',
    selectedTextFormat: 'count > 2',
    countSelectedText: '{0} Permisos seleccionados',
    size: 5
  };
  dropdownSelectStyle = DropdownSelectStyle.Info;
  readonly permissionList: DropdownSelectItem[] = [];

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
    this.permissionList = ALL_PERMISSIONS.map(({ id, displayName }) => ({
      value: id,
      text: displayName
    }));
    this.changePermissionsStyle();
  }

  createRole() {
    const roleRequest: RoleRequest = {
      name: this.name.value,
      displayName: this.displayName.value,
      permissionsIDs: this.permissions.value
    };
    this.identity.createRole(roleRequest)
      .pipe(take(1))
      .subscribe(_ => this.activeModal.close(RoleState.Created));
  }

  close() {
    this.activeModal.close();
  }

  private changePermissionsStyle() {
    this.permissions.valueChanges.subscribe(() => {
      const { invalid, dirty, touched } = this.permissions;
      if (invalid && dirty || invalid && touched) {
        this.dropdownSelectStyle = DropdownSelectStyle.Danger;

        return;
      }
      this.dropdownSelectStyle = DropdownSelectStyle.Info;
    });
  }
}