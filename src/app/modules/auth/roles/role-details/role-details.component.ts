import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleResponse } from '@modules/auth/models/role';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IdentityService } from '@services/identity/identity.service';
import { of, throwError } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
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
    }, _ => this.giveBack());
  }

  close(active: NgbActiveModal) {
    active.close(null);
  }

  private fetchRole() {
    const role$ = this.identity.fetchRoleById(this.roleId).pipe(
      mergeMap(role => !!role ? of(role) : throwError(null)),
      take(1)
    );

    return role$;
  }

  private actionOnCompletion() {
    this.roleModal.hidden.pipe(take(1)).subscribe(_ => this.giveBack());
  }

  private giveBack() {
    this.router.navigate([ ROUTES.ROLES.MAIN ]);
  }
}
