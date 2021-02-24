import { Component, OnInit } from '@angular/core';
import { RoleResponse } from '@modules/auth/models/role';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IdentityService } from '@services/identity/identity.service';
import { CreateRoleComponent } from '@modules/auth/roles/create-role/create-role.component';
import { of } from 'rxjs';

@Component({
  selector: 'arf-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  roles$ = of<RoleResponse[]>([]);

  constructor(private modal: NgbModal, private identity: IdentityService) { }

  ngOnInit() {
    this.roles$ = this.identity.fetchRoles();
  }

  openCreateRole() {
    const modalRef = this.modal.open(CreateRoleComponent, {
      animation: true,
      backdrop: 'static',
      centered: true,
      keyboard: false
    });
  }
}
