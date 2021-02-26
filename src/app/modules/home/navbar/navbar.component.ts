import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ToggleService } from '@modules/home/services/toggle.service';
import { APP_ROUTES } from 'src/app/models/routes';
import { BehaviorSubject, Observable } from 'rxjs';
import { IdentityService } from '@services/identity/identity.service';
import { filter, mergeMap, take } from 'rxjs/operators';
import { AuthorizationService } from '@services/authorization/authorization.service';

@Component({
  selector: 'arf-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements AfterViewInit {
  @ViewChild('toggle')
  private readonly toggleRef: ElementRef<HTMLDivElement>;

  private readonly loadingSubject = new BehaviorSubject(false);
  readonly loading$: Observable<boolean>;
  readonly startRedirect$: Observable<string>;

  constructor(
    private router: Router,
    private toggle: ToggleService,
    private identity: IdentityService,
    private authorization: AuthorizationService
  ) {
    this.loading$ = this.loadingSubject.asObservable();
    this.startRedirect$ = this.authorization.startRedirect$;
  }

  ngAfterViewInit() {
    this.toggle.addToggle(this.toggleRef.nativeElement);
  }

  logout() {
    this.loadingSubject.next(true);
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
    ).subscribe(_ => {
      this.authorization.removeRoleAndPermissions();
      this.loadingSubject.next(false);
    });
  }
}
