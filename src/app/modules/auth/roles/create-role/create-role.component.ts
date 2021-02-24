import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ALL_PERMISSIONS } from '@modules/auth/models/permission';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownSelectItem, DropdownSelectOptions, DropdownSelectStyle } from '@shared/dropdown-select';

@Component({
  selector: 'arf-create-role',
  templateUrl: './create-role.component.html',
  styles: []
})
export class CreateRoleComponent implements OnInit {
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
  readonly dropdownSelectStyle = DropdownSelectStyle.Info;
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

  constructor(private activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
    this.permissionList = ALL_PERMISSIONS.map(({ id, displayName }) => ({
      value: id,
      text: displayName
    }));
    this.permissions.valueChanges.subscribe(console.log);
  }

  ngOnInit() {
  }

  createRole() {
    if (this.roleForm.invalid) {
      return;
    }
  }

  close() {
    this.activeModal.close();
  }
}
