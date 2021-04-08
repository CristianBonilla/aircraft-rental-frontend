import { Inject, Pipe, PipeTransform } from '@angular/core';
import { RefreshRoles, REFRESH_ROLES } from '@core/providers/refresh.provider';
import { UserResponse, UserWithRole } from '@modules/auth/models/authentication';
import { from } from 'rxjs';
import { filter, map, mergeAll, mergeMap, take, toArray } from 'rxjs/operators';

@Pipe({
  name: 'usersWithRole'
})
export class UsersWithRolePipe implements PipeTransform {
  constructor(@Inject(REFRESH_ROLES) private refresh: RefreshRoles) { }

  transform(users: UserResponse[]) {
    this.refresh.dispatch();
    const users$ = from(users);
    const usersWithRole$ = this.refresh.data$.pipe(
      take(1),
      mergeAll(),
      mergeMap(role => users$.pipe(
        filter(({ roleId }) => roleId === role.id),
        map(user => ({ ...user, role }))
      )),
      toArray<UserWithRole>()
    );

    return usersWithRole$;
  }
}
