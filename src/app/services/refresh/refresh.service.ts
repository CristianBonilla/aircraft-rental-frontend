import { Injectable } from '@angular/core';
import { RoleResponse } from '@modules/auth/models/role';
import { IdentityService } from '@services/identity/identity.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

interface Refresh<T extends object> {
  loading$: BehaviorSubject<boolean>;
  data$: BehaviorSubject<T>;
}

export interface Dispatch<T extends object> {
  loading$: Observable<boolean>;
  data$: Observable<T>;
}

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  private readonly refreshRoles: Refresh<RoleResponse[]>;
  readonly roles: Dispatch<RoleResponse[]>;

  constructor(private identity: IdentityService) {
    const loading$ = new BehaviorSubject(false);
    const data$ = new BehaviorSubject([]);
    this.refreshRoles = { loading$, data$ };
    this.roles = {
      loading$: loading$.asObservable(),
      data$: data$.asObservable()
    };
  }

  dispatchRoles() {
    this.refreshRoles.loading$.next(true);
    this.identity.fetchRoles().pipe(take(1))
      .subscribe(roles => {
        this.refreshRoles.data$.next(roles);
        this.refreshRoles.loading$.next(false);
      });
  }
}
