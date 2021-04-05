import { Injectable } from '@angular/core';
import { UserAccount } from '@modules/auth/models/authentication';
import { Permission, PermissionType } from '@modules/auth/models/permission';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { BehaviorSubject, Observable } from 'rxjs';
import { APP_ROUTES } from 'src/app/models/routes';

const { HOME: ROUTES } = APP_ROUTES;

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private readonly startRedirectSubject = new BehaviorSubject<string>(null);
  readonly startRedirect$: Observable<string>;

  constructor(private roles: NgxRolesService, private permissions: NgxPermissionsService) {
    this.startRedirect$ = this.startRedirectSubject.asObservable();
  }

  loadRoleAndPermissions({ role }: UserAccount) {
    const { name: roleName, permissions } = role;
    const permissionNames = permissions.map(({ name }) => name);
    this.roles.addRoleWithPermissions(roleName, permissionNames);
    this.startRedirectTo(permissions);
  }

  removeRoleAndPermissions() {
    this.roles.flushRoles();
    this.permissions.flushPermissions();
    this.startRedirectSubject.next(null);
  }

  private startRedirectTo(permissions: Permission[]) {
    let redirectTo = permissions.sort((compareA, compareB) => compareA.id - compareB.id)
      .map(({ name }) => {
        switch (name) {
          case PermissionType.ROLES:
            return ROUTES.ROLES.MAIN;
          case PermissionType.USERS:
            return ROUTES.USERS.MAIN;
          case PermissionType.AIRCRAFTS:
            return ROUTES.AIRCRAFTS;
          case PermissionType.PASSENGERS:
            return ROUTES.PASSENGERS;
          default:
            return ROUTES.RENTALS;
        }
      })
      .splice(0, 1)
      .reduce((_, route) => route);
    if (!redirectTo) {
      redirectTo = ROUTES.MAIN;
    }
    this.startRedirectSubject.next(redirectTo);
  }
}
