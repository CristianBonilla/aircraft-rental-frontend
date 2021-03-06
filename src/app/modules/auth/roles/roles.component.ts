import { Component, OnInit } from '@angular/core';
import { RoleResponse, RoleState } from '@modules/auth/models/role';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IdentityService } from '@services/identity/identity.service';
import { CreateRoleComponent } from '@modules/auth/roles/create-role/create-role.component';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { DEFAULT_MODAL_OPTIONS } from 'src/app/models/modal';

@Component({
  selector: 'arf-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  private readonly loadingSubject = new BehaviorSubject(false);
  readonly loading$: Observable<boolean>;
  roles$ = of<RoleResponse[]>([]);

  constructor(private modal: NgbModal, private identity: IdentityService) {
    this.loading$ = this.loadingSubject.asObservable();
  }

  ngOnInit() {
    this.refreshRoles();
  }

  openCreateRole() {
    const modal = this.modal.open(CreateRoleComponent, DEFAULT_MODAL_OPTIONS);
    this.createRoleClosed(modal);
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
    this.roles$ = this.identity.fetchRoles().pipe(
      take(1), tap(_ => this.loadingSubject.next(false)));
  }
}
