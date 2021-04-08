import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Permission } from '@modules/auth/models/permission';
import { RoleResponse } from '@modules/auth/models/role';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IdentityService } from '@services/identity/identity.service';
import { iif, throwError } from 'rxjs';
import { filter, map, mergeMap, take } from 'rxjs/operators';
import { DEFAULT_MODAL_OPTIONS } from 'src/app/models/modal';
import { APP_ROUTES } from 'src/app/models/routes';

const { HOME: ROUTES } = APP_ROUTES;

@Component({
  selector: 'arf-role-details',
  templateUrl: './role-details.component.html',
  styles: []
})
export class RoleDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('roleTemplate')
  readonly roleTemplate: TemplateRef<NgbActiveModal>;
  private roleModal: NgbModalRef = null;
  private roleId: number | null = null;
  role: RoleResponse = null;

  constructor(
    private modal: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private identity: IdentityService
  ) { }

  ngOnInit() {
    const { params: { roleId } } = this.route.snapshot;
    this.roleId = roleId;
  }

  ngAfterViewInit() {
    if (!this.roleId && isNaN(this.roleId)) {
      this.giveBack();

      return;
    }
    this.fetchRole().subscribe(role => {
      this.role = role;
      this.roleModal = this.modal.open(this.roleTemplate, DEFAULT_MODAL_OPTIONS);
      this.actionOnCompletion();
      this.onPopState();
    }, _ => this.giveBack());
  }

  close(active: NgbActiveModal) {
    active.close(null);
  }

  private fetchRole() {
    const role$ = this.identity.fetchRoleById(this.roleId).pipe(
      mergeMap(role => iif(() => !!role,
        this.roleWithPermissions(role),
        throwError(null)
      )),
      take(1)
    );

    return role$;
  }

  private roleWithPermissions(role: RoleResponse) {
    const role$ = this.identity.fetchPermissionsByRole(role.id).pipe(
      map<Permission[], RoleResponse>(permissions => ({ ...role, permissions }))
    );

    return role$;
  }

  private actionOnCompletion() {
    this.roleModal.hidden.pipe(take(1)).subscribe(_ => this.giveBack());
  }

  private giveBack() {
    this.router.navigate([ ROUTES.ROLES.MAIN ]);
  }

  private onPopState() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart && !!event.restoredState),
      take(1)
    ).subscribe(_ => this.roleModal.close(null));
  }
}
