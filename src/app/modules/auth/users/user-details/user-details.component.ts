import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleResponse } from '@modules/auth/models/role';
import { UserWithRole } from '@modules/auth/users/pipes/users-with-role/users-with-role.pipe';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IdentityService } from '@services/identity/identity.service';
import { iif, throwError } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';
import { DEFAULT_MODAL_OPTIONS } from 'src/app/models/modal';
import { APP_ROUTES } from 'src/app/models/routes';

const { HOME: ROUTES } = APP_ROUTES;

@Component({
  selector: 'arf-user-details',
  templateUrl: './user-details.component.html',
  styles: []
})
export class UserDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('userTemplate')
  readonly userTemplate: TemplateRef<NgbActiveModal>;
  private userModal: NgbModalRef = null;
  private userId: number | null = null;
  user: UserWithRole = null;

  constructor(
    private modal: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private identity: IdentityService
  ) { }

  ngOnInit() {
    const { params: { userId } } = this.route.snapshot;
    this.userId = userId;
  }

  ngAfterViewInit() {
    if (!this.userId && isNaN(this.userId)) {
      this.giveBack();

      return;
    }
    this.fetchUser().subscribe(user => {
      this.user = user;
      this.userModal = this.modal.open(this.userTemplate, DEFAULT_MODAL_OPTIONS);
      this.actionOnCompletion();
    }, _ => this.giveBack());
  }

  close(active: NgbActiveModal) {
    active.close(null);
  }

  private fetchUser() {
    const user$ = this.identity.fetchUserById(this.userId).pipe(
      mergeMap(user => iif(() => !!user,
        this.identity.fetchRoleById(user.roleId).pipe(
          map<RoleResponse, UserWithRole>(role => ({ ...user, role }))
        ),
        throwError(null)
      )),
      take(1)
    );

    return user$;
  }

  private actionOnCompletion() {
    this.userModal.hidden.pipe(take(1)).subscribe(_ => this.giveBack());
  }

  private giveBack() {
    this.router.navigate([ ROUTES.USERS.MAIN ]);
  }
}
