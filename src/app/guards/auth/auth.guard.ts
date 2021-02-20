import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { map, take } from 'rxjs/operators';
import { APP_ROUTES } from 'src/app/models/routes';

const { AUTH, HOME: { MAIN } } = APP_ROUTES;

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(_: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const hasToken$ = this.authService.getTokenInStorage().pipe(
      take(1),
      map(token => {
        const hasToken = !!token && !!token.trim();
        if (!hasToken && state.url === MAIN) {
          this.router.navigate([ AUTH ]);

          return false;
        } else if (hasToken && state.url === AUTH) {
          this.router.navigate([ MAIN ]);

          return false;
        }

        return true;
      })
    );

    return hasToken$;
  }
}
