import { Injectable } from '@angular/core';
import { UserAccount } from '@modules/auth/models/authentication';
import { Permission, PermissionType } from '@modules/auth/models/permission';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { BehaviorSubject, Observable } from 'rxjs';
import { APP_ROUTES } from 'src/app/models/routes';

const { HOME } = APP_ROUTES;

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private readonly redirectToSubject = new BehaviorSubject<string>(null);
  readonly startRedirect$: Observable<string>;

  constructor(private roles: NgxRolesService, private permissions: NgxPermissionsService) {
    this.startRedirect$ = this.redirectToSubject.asObservable();
  }

  loadRoleAndPermissions({ role }: UserAccount) {
    const { name, permissions } = role;
    const permissionNames = permissions.map(({ name }) => name);
    this.roles.addRoleWithPermissions(name, permissionNames);
    this.startRedirectTo(permissions);
  }

  removeRoleAndPermissions() {
    this.roles.flushRoles();
    this.permissions.flushPermissions();
  }

  private startRedirectTo(permissions: Permission[]) {
    let redirectTo = permissions.sort((compareA, compareB) => compareA.id - compareB.id)
      .map(({ name }) => {
        switch (name) {
          case PermissionType.ROLES:
            return HOME.ROLES;
          case PermissionType.USERS:
            return HOME.USERS;
          case PermissionType.AIRCRAFTS:
            return HOME.AIRCRAFTS;
          case PermissionType.PASSENGERS:
            return HOME.PASSENGERS;
          default:
            return HOME.RENTALS;
        }
      })
      .splice(0, 1)
      .reduce((_, route) => route);
    if (!redirectTo) {
      redirectTo = HOME.MAIN;
    }
    this.redirectToSubject.next(redirectTo);
  }
}
