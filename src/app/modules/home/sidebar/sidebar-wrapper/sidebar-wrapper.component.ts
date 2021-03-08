import { Component } from '@angular/core';
import { ALLOW } from '@modules/auth/models/permission';
import { IdentityService } from '@services/identity/identity.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { SIDEBAR_ROUTES } from 'src/app/models/routes';

@Component({
  selector: 'arf-sidebar-wrapper',
  templateUrl: './sidebar-wrapper.component.html',
  styles: []
})
export class SidebarWrapperComponent {
  readonly ROUTES = SIDEBAR_ROUTES;
  readonly userName: Observable<string>;
  readonly allowRoles = ALLOW.ROLES;
  readonly allowUsers = ALLOW.USERS;
  readonly allowRentals = ALLOW.RENTALS;
  readonly allowAircrafts = ALLOW.AIRCRAFTS;
  readonly allowPassengers = ALLOW.PASSENGERS;

  constructor(identity: IdentityService) {
    this.userName = identity.userAccount$.pipe(
      take(1),
      map(({ user }) => user.firstName));
  }
}
