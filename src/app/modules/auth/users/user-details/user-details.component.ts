import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { UserResponse, UserWithRole } from '@modules/auth/models/authentication';
import { RoleResponse } from '@modules/auth/models/role';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IdentityService } from '@services/identity/identity.service';
import { iif, throwError } from 'rxjs';
import { filter, map, mergeMap, take } from 'rxjs/operators';
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
  private userId: string | null = null;
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
    if (!this.userId || !!this.userId && !this.userId.trim()) {
      this.giveBack();

      return;
    }
    this.fetchUser().subscribe(user => {
      this.user = user;
      this.userModal = this.modal.open(this.userTemplate, DEFAULT_MODAL_OPTIONS);
      this.actionOnCompletion();
      this.onPopState();
    }, _ => this.giveBack());
  }

  close(active: NgbActiveModal) {
    active.close(null);
  }

  private fetchUser() {
    const user$ = this.identity.fetchUserById(this.userId).pipe(
      mergeMap(user => iif(() => !!user,
        this.userWithRole(user),
        throwError(null)
      )),
      take(1)
    );

    return user$;
  }

  private userWithRole(user: UserResponse) {
    const user$ = this.identity.fetchRoleById(user.roleId).pipe(
      map<RoleResponse, UserWithRole>(role => ({ ...user, role }))
    );

    return user$;
  }

  private actionOnCompletion() {
    this.userModal.hidden.pipe(take(1)).subscribe(_ => this.giveBack());
  }

  private giveBack() {
    this.router.navigate([ ROUTES.USERS.MAIN ]);
  }

  private onPopState() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart && !!event.restoredState),
      take(1)
    ).subscribe(_ => this.userModal.close(null));
  }
}
