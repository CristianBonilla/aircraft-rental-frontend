import { Inject, Pipe, PipeTransform } from '@angular/core';
import { RefreshRoles, REFRESH_ROLES } from '@core/providers/refresh.provider';
import { UserResponse } from '@modules/auth/models/authentication';
import { RoleResponse } from '@modules/auth/models/role';
import { combineLatest, from, Observable } from 'rxjs';
import { map, mergeMap, take, toArray } from 'rxjs/operators';

export interface UserWithRole extends UserResponse {
  role: RoleResponse;
};

@Pipe({
  name: 'usersWithRole'
})
export class UsersWithRolePipe implements PipeTransform {
  private readonly roles$: Observable<RoleResponse[]>;

  constructor(@Inject(REFRESH_ROLES) private refresh: RefreshRoles) {
    this.roles$ = this.refresh.data$;
    this.refresh.dispatch();
  }

  transform(users$: Observable<UserResponse[]>) {
    const usersWithRole$ = combineLatest([ this.roles$, users$ ]).pipe(
      take(1),
      mergeMap(([ roles, users ]) => from(users).pipe(
        map(user => ({
          ...user,
          role: roles.find(({ id }) => id === user.roleId)
        }))
      )),
      toArray<UserWithRole>()
    );

    return usersWithRole$;
  }
}
