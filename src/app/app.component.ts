import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthorizationService } from '@services/authorization/authorization.service';
import { IdentityService } from '@services/identity/identity.service';
import { of } from 'rxjs';
import { catchError, filter, map, mergeMap, take } from 'rxjs/operators';
import { APP_ROUTES } from 'src/app/models/routes';

@Component({
  selector: 'arf-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private identity: IdentityService,
    private authorization: AuthorizationService
  ) { }

  ngOnInit() {
    this.identity.refreshUser().pipe(
      filter(userAccount => !!userAccount),
      take(1))
    .subscribe(userAccount => {
      this.authorization.loadRoleAndPermissions(userAccount);
      this.nonExistentUser(userAccount.user.id);
    });
  }

  private nonExistentUser(userId: number) {
    this.identity.fetchUserById(userId).pipe(
      map(user => !!user),
      catchError(_ => of(false)),
      filter(existing => !existing),
      take(1)
    ).subscribe(_ => this.logout());
  }

  private logout() {
    this.identity.userLogout()
      .pipe(take(1))
      .subscribe(() => {
        this.router.navigate([ APP_ROUTES.AUTH ]);
        this.authNavigationEnd();
      });
  }

  private authNavigationEnd() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      mergeMap(_ => this.identity.refreshUser()),
      take(1)
    ).subscribe(_ => this.authorization.removeRoleAndPermissions());
  }
}
