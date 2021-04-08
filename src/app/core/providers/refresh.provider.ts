import { inject, InjectFlags, InjectionToken } from '@angular/core';
import { CoreModule } from '@core/core.module';
import { UserResponse } from '@modules/auth/models/authentication';
import { RoleResponse } from '@modules/auth/models/role';
import { PassengerResponse } from '@modules/passengers/models/passenger';
import { IdentityService } from '@services/identity/identity.service';
import { Refresh } from '@facade/.';
import { RefreshFacade } from '@facade/refresh-facade/refresh-facade';
import { RentalsService } from '@services/rentals/rentals.service';
import { AircraftResponse } from '@modules/aircrafts/models/aircraft';
import { AircraftsService } from '@services/aircrafts/aircrafts.service';

type InjectionTokenOptions = ConstructorParameters<typeof InjectionToken>[1];

const DEFAULT_TOKEN_OPTIONS: Pick<InjectionTokenOptions, 'providedIn'> = {
  providedIn: CoreModule
};

export type RefreshRoles = Refresh<RoleResponse[]>;
export type RefreshUsers = Refresh<UserResponse[]>;
export type RefreshPassengers = Refresh<PassengerResponse[]>;
export type RefreshAircrafts = Refresh<AircraftResponse[]>;

enum REFRESH_FETCH_ROLES {
  ALL
}

enum REFRESH_FETCH_USERS {
  ALL
}

enum REFRESH_FETCH_PASSENGERS {
  ALL
}

enum REFRESH_FETCH_AIRCRAFTS {
  ALL
}

export function refreshRolesFactory(
  identity: IdentityService,
  fetchType: REFRESH_FETCH_ROLES = REFRESH_FETCH_ROLES.ALL
) {
  switch (fetchType) {
    default:
      return new RefreshFacade(identity.fetchRoles());
  }
}

export function refreshUsersFactory(
  identity: IdentityService,
  fetchType: REFRESH_FETCH_USERS = REFRESH_FETCH_USERS.ALL
) {
  switch (fetchType) {
    default:
      return new RefreshFacade(identity.fetchUsers());
  }
}

export function refreshPassegersFactory(
  rentals: RentalsService,
  fetchType: REFRESH_FETCH_PASSENGERS = REFRESH_FETCH_PASSENGERS.ALL
) {
  switch (fetchType) {
    default:
      return new RefreshFacade(rentals.fetchPassengers());
  }
}

export function refreshAircraftsFactory(
  aircrafts: AircraftsService,
  fetchType: REFRESH_FETCH_AIRCRAFTS = REFRESH_FETCH_AIRCRAFTS.ALL
) {
  switch (fetchType) {
    default:
      return new RefreshFacade(aircrafts.fetchAircrafts());
  }
}

export const REFRESH_ROLES = new InjectionToken<RefreshRoles>('refresh.roles', {
  ...DEFAULT_TOKEN_OPTIONS,
  factory: () => refreshRolesFactory(inject(IdentityService, InjectFlags.Default))
});

export const REFRESH_USERS = new InjectionToken<RefreshUsers>('refresh.users', {
  ...DEFAULT_TOKEN_OPTIONS,
  factory: () => refreshUsersFactory(inject(IdentityService, InjectFlags.Default))
});

export const REFRESH_PASSENGERS = new InjectionToken<RefreshPassengers>('refresh.passengers', {
  ...DEFAULT_TOKEN_OPTIONS,
  factory: () => refreshPassegersFactory(inject(RentalsService, InjectFlags.Default))
});

export const REFRESH_AIRCRAFTS = new InjectionToken<RefreshAircrafts>('refresh.aircrafts', {
  ...DEFAULT_TOKEN_OPTIONS,
  factory: () => refreshAircraftsFactory(inject(AircraftsService, InjectFlags.Default))
});
