import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserAccount, UserLoginRequest, UserRegisterRequest } from '@modules/auth/models/authentication';
import { AuthorizationService } from '@services/authorization/authorization.service';
import { IdentityService } from '@services/identity/identity.service';
import { defer, Observable, of } from 'rxjs';
import { catchError, defaultIfEmpty, delay, filter, map, mergeMap, take, tap } from 'rxjs/operators';
import { APP_ROUTES } from 'src/app/models/routes';

@Injectable({
  providedIn: 'root'
})
export class UserAccountRoutingService {
  constructor(
    private identity: IdentityService,
    private authorization: AuthorizationService,
    private router: Router) { }

  loadUser() {
    const loadUser$ = this.identity.refreshUser().pipe(
      filter(userAccount => !!userAccount),
      tap(userAccount => this.authorization.loadRoleAndPermissions(userAccount)),
      mergeMap(userAccount => this.nonExistentUser(userAccount.user.id)),
      defaultIfEmpty<NavigationEnd, null>(null)
    );

    return loadUser$;
  }

  login(userLoginRequest: UserLoginRequest) {
    const login$ = this.identity.userLogin(userLoginRequest).pipe(
      delay(3000),
      mergeMap(userAccount => this.redirectToMain(userAccount))
    );

    return login$;
  }

  register(userRegisterRequest: UserRegisterRequest) {
    const register$ = this.identity.userRegister(userRegisterRequest).pipe(
      delay(3000),
      mergeMap(userAccount => this.redirectToMain(userAccount))
    );

    return register$;
  }

  logout() {
    const logout$ = this.identity.userLogout().pipe(
      delay(3000),
      mergeMap(() => this.redirectToAuth())
    );

    return logout$;
  }

  private redirectToMain(userAccount: UserAccount) {
    const redirect$ = defer(() => {
      this.authorization.loadRoleAndPermissions(userAccount);
      this.router.navigate([ APP_ROUTES.HOME.MAIN ]);
      const mainRedirected$ = this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        take(1)
      ) as Observable<NavigationEnd>;

      return mainRedirected$;
    });

    return redirect$;
  }

  private redirectToAuth() {
    const redirect$ = defer(() => {
      this.authorization.removeRoleAndPermissions();
      this.router.navigate([ APP_ROUTES.AUTH ]);
      const refreshUser$ = this.identity.refreshUser();
      const authRedirected$ = this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        mergeMap(event => refreshUser$.pipe(map(_ => event))),
        take(1)
      ) as Observable<NavigationEnd>;

      return authRedirected$;
    });

    return redirect$;
  }

  private nonExistentUser(userId: number) {
    const nonExistentUser$ = this.identity.fetchUserById(userId).pipe(
      map(user => !!user),
      catchError(_ => of(false)),
      filter(existing => !existing),
      mergeMap(() => this.logout())
    );

    return nonExistentUser$;
  }
}
