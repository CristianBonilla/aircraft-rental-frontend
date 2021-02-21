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
    const isAuthenticated$ = this.authService.isAuthenticated().pipe(
      take(1),
      map(authenticated => {
        if (!authenticated && state.url === MAIN) {
          this.router.navigate([ AUTH ]);

          return false;
        } else if (authenticated && state.url === AUTH) {
          this.router.navigate([ MAIN ]);

          return false;
        }

        return true;
      })
    );

    return isAuthenticated$;
  }
}
