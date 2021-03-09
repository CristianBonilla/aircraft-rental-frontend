import { inject, InjectFlags, InjectionToken } from '@angular/core';
import { CoreModule } from '@core/core.module';
import { UserResponse } from '@modules/auth/models/authentication';
import { RoleResponse } from '@modules/auth/models/role';
import { IdentityService } from '@services/identity/identity.service';
import { Refresh } from '@facade/.';
import { RefreshFacade } from '@facade/refresh-facade/refresh-facade';

type InjectionTokenOptions = ConstructorParameters<typeof InjectionToken>[1];

const DEFAULT_TOKEN_OPTIONS: Pick<InjectionTokenOptions, 'providedIn'> = {
  providedIn: CoreModule
};

export type RefreshRoles = Refresh<RoleResponse[]>;
export type RefreshUsers = Refresh<UserResponse[]>;

enum REFRESH_FETCH_ROLES {
  ALL
}

enum REFRESH_FETCH_USERS {
  ALL
}

export function refreshRolesFactory(
  identity: IdentityService,
  fetchType: REFRESH_FETCH_ROLES = REFRESH_FETCH_ROLES.ALL
) {
  switch (fetchType) {
    default:
      return new RefreshFacade(identity.fetchRoles());
  };
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

export const REFRESH_ROLES = new InjectionToken<Refresh<RoleResponse[]>>('refresh.roles', {
  ...DEFAULT_TOKEN_OPTIONS,
  factory: () => refreshRolesFactory(inject(IdentityService, InjectFlags.Default))
});

export const REFRESH_USERS = new InjectionToken<Refresh<UserResponse[]>>('refresh.users', {
  ...DEFAULT_TOKEN_OPTIONS,
  factory: () => refreshUsersFactory(inject(IdentityService, InjectFlags.Default))
});