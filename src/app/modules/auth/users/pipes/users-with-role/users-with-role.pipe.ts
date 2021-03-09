import { Inject, Pipe, PipeTransform } from '@angular/core';
import { RefreshRoles, REFRESH_ROLES } from '@core/providers/refresh.provider';
import { UserResponse } from '@modules/auth/models/authentication';
import { RoleResponse } from '@modules/auth/models/role';
import { combineLatest, from, Observable, of } from 'rxjs';
import { filter, map, mergeAll, mergeMap, take, toArray } from 'rxjs/operators';

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
  }

  transform(users: UserResponse[]) {
    this.refresh.dispatch();
    const usersWithRole$ = from(users).pipe(
      mergeMap(user => combineLatest([
        of(user),
        this.roleById(user.roleId)
      ])),
      map(([ user, role ]) => ({ ...user, role })),
      toArray<UserWithRole>()
    );

    return usersWithRole$;
  }

  private roleById(roleId: number) {
    const role$ = this.roles$.pipe(
      take(1),
      mergeAll(),
      filter(({ id }) => id === roleId)
    );

    return role$;
  }
}
