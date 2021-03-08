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
  readonly roles$: Observable<RoleResponse[]>;

  constructor(@Inject(REFRESH_ROLES) private refresh: RefreshRoles) {
    this.roles$ = this.refresh.data$;
    this.refresh.dispatch();
  }

  transform(usersResponse: UserResponse[]) {
    const usersWithRole$ = from(usersResponse)
      .pipe(
        mergeMap(user => combineLatest([
          of(user),
          this.roleById(user.id)
        ])),
        map(([ user, role ]) => ({ ...user, role })),
        toArray<UserWithRole>()
      );

    return usersWithRole$;
  }

  private roleById(roleId: number) {
    const role$ = this.roles$.pipe(
      mergeAll(),
      filter(({ id }) => id === roleId),
      // emit to complete the observable source
      take(1)
    );

    return role$;
  }
}
