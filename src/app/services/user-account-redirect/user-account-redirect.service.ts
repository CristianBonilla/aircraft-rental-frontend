import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserAccount, UserLoginRequest, UserRegisterRequest, UserResponse } from '@modules/auth/models/authentication';
import { AuthorizationService } from '@services/authorization/authorization.service';
import { IdentityService } from '@services/identity/identity.service';
import { defer, Observable, throwError, timer } from 'rxjs';
import { catchError, defaultIfEmpty, delay, filter, map, mergeMap, take, tap } from 'rxjs/operators';
import { APP_ROUTES } from 'src/app/models/routes';

@Injectable({
  providedIn: 'root'
})
export class UserAccountRedirectService {
  constructor(
    private identity: IdentityService,
    private authorization: AuthorizationService,
    private router: Router) { }

  loadUser() {
    const loadUser$ = this.identity.refreshUser().pipe(
      filter(userAccount => !!userAccount),
      tap(userAccount => this.authorization.loadRoleAndPermissions(userAccount)),
      mergeMap(userAccount => this.nonExistentUser(userAccount.user)),
      defaultIfEmpty<NavigationEnd, null>(null)
    );

    return loadUser$;
  }

  login(userLoginRequest: UserLoginRequest) {
    const login$ = this.identity.userLogin(userLoginRequest).pipe(
      delay(3000),
      mergeMap(userAccount => this.redirectToMain(userAccount)),
      catchError(error => timer(3000).pipe(mergeMap(_ => throwError(error))))
    );

    return login$;
  }

  register(userRegisterRequest: UserRegisterRequest) {
    const register$ = this.identity.userRegister(userRegisterRequest).pipe(
      delay(3000),
      mergeMap(userAccount => this.redirectToMain(userAccount)),
      catchError(error => timer(3000).pipe(mergeMap(_ => throwError(error))))
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
      this.router.navigate([ APP_ROUTES.AUTH ]);
      const refreshUser$ = this.identity.refreshUser();
      const authRedirected$ = this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        mergeMap(event => refreshUser$.pipe(map(_ => event))),
        take(1),
        tap(_ => this.authorization.removeRoleAndPermissions())
      ) as Observable<NavigationEnd>;

      return authRedirected$;
    });

    return redirect$;
  }

  private nonExistentUser(userResponse: UserResponse) {
    const nonExistentUser$ = this.identity.userExists(userResponse).pipe(
      map(user => !!user),
      filter(existing => !existing),
      mergeMap(() => this.logout())
    );

    return nonExistentUser$;
  }
}
