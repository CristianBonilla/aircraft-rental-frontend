import { Pipe, PipeTransform } from '@angular/core';
import { RoleResponse } from '@modules/auth/models/role';
import { IdentityService } from '@services/identity/identity.service';
import { combineLatest, EMPTY, iif, of } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Pipe({
  name: 'roleWithPermissions'
})
export class RoleWithPermissionsPipe implements PipeTransform {
  constructor(private identity: IdentityService) { }

  transform(roleResponse: RoleResponse) {
    const role$ = iif(() => !!roleResponse,
      combineLatest([
        of(roleResponse),
        this.permissionsByRoleId(roleResponse.id)
      ]),
      EMPTY
    ).pipe(map(([ role, permissions ]) => ({ ...role, permissions })));

    return role$;
  }

  private permissionsByRoleId(roleId: number) {
    const permissions$ = this.identity.fetchPermissionsByRole(roleId).pipe(take(1));

    return permissions$;
  }
}
