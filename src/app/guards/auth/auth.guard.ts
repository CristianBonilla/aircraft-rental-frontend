import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthorizationService } from '@services/authorization/authorization.service';
import { IdentityService } from '@services/identity/identity.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { APP_ROUTES } from 'src/app/models/routes';

const { AUTH, HOME: { MAIN } } = APP_ROUTES;

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private identity: IdentityService,
    private authorization: AuthorizationService) { }

  canActivate(_: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAuthenticated$ = combineLatest([
      this.identity.isAuthenticated(),
      this.authorization.startRedirect$
    ]).pipe(
      map(([ authenticated, startRedirect ]) => {
        if (authenticated && (state.url === AUTH || state.url === MAIN && state.url !== startRedirect)) {
          this.router.navigate([ startRedirect ]);

          return false;
        } else if (!authenticated && (state.url === MAIN || state.url !== AUTH)) {
          this.router.navigate([ AUTH ]);

          return false;
        }

        return true;
      })
    );

    return isAuthenticated$;
  }
}
