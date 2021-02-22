import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToggleService } from '@modules/home/services/toggle.service';
import { APP_ROUTES } from 'src/app/models/routes';
import { Observable } from 'rxjs';
import { IdentityService } from '@services/identity/identity.service';
import { take } from 'rxjs/operators';
import { AuthorizationService } from '@services/authorization/authorization.service';

@Component({
  selector: 'arf-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements AfterViewInit {
  @ViewChild('toggle')
  private readonly toggleRef: ElementRef<HTMLDivElement>;
  readonly loading$: Observable<boolean>;
  readonly startRedirect$: Observable<string>;

  constructor(
    private router: Router,
    private toggle: ToggleService,
    private identity: IdentityService,
    authorization: AuthorizationService) {
    this.loading$ = this.identity.loading$;
    this.startRedirect$ = authorization.startRedirect$;
  }

  ngAfterViewInit() {
    this.toggle.addToggle(this.toggleRef.nativeElement);
  }

  logout() {
    this.identity.userLogout()
      .pipe(take(1))
      .subscribe(() => this.router.navigate([ APP_ROUTES.AUTH ]));
  }
}
