import { Component, OnInit } from '@angular/core';
import { RoleResponse, RoleState } from '@modules/auth/models/role';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IdentityService } from '@services/identity/identity.service';
import { CreateRoleComponent } from '@modules/auth/roles/create-role/create-role.component';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'arf-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  roles$ = of<RoleResponse[]>([]);
  private readonly loadingSubject = new BehaviorSubject(false);
  readonly loading$: Observable<boolean>;

  constructor(private modal: NgbModal, private identity: IdentityService) {
    this.loading$ = this.loadingSubject.asObservable();
  }

  ngOnInit() {
    this.refreshRoles();
  }

  openCreateRole() {
    const modal = this.modal.open(CreateRoleComponent, {
      animation: true,
      backdrop: 'static',
      centered: true,
      keyboard: false
    });
    this.createRoleClosed(modal);
    modal.componentInstance
  }

  createRoleClosed(modal: NgbModalRef) {
    modal.closed.subscribe((state: RoleState) => {
      if (state === RoleState.Created) {
        this.refreshRoles();
      }
    });
  }

  private refreshRoles() {
    this.loadingSubject.next(true);
    this.roles$ = this.identity.fetchRoles()
      .pipe(tap(_ => this.loadingSubject.next(false)));
  }
}
