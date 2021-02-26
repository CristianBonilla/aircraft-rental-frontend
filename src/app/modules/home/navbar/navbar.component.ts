import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ToggleService } from '@modules/home/services/toggle.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthorizationService } from '@services/authorization/authorization.service';
import { UserAccountRedirectService } from '@services/user-account-redirect/user-account-redirect.service';

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
    private toggle: ToggleService,
    private authorization: AuthorizationService,
    private userAccountRedirect: UserAccountRedirectService
  ) {
    this.loading$ = this.loadingSubject.asObservable();
    this.startRedirect$ = this.authorization.startRedirect$;
  }

  ngAfterViewInit() {
    this.toggle.addToggle(this.toggleRef.nativeElement);
  }

  logout() {
    this.loadingSubject.next(true);
    this.userAccountRedirect.logout()
      .pipe(take(1))
      .subscribe(() => this.loadingSubject.next(false));
  }
}
