import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { ToggleService } from '@modules/home/services/toggle.service';
import { APP_ROUTES } from 'src/app/models/routes';
import { Observable } from 'rxjs';

@Component({
  selector: 'arf-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements AfterViewInit {
  @ViewChild('toggle')
  private readonly toggleRef: ElementRef<HTMLDivElement>;
  readonly loading$: Observable<boolean>;

  constructor(
    private router: Router,
    private toggleService: ToggleService,
    private authService: AuthService) {
    this.loading$ = this.authService.loading$;
  }

  ngAfterViewInit() {
    this.toggleService.addToggle(this.toggleRef.nativeElement);
  }

  logout() {
    this.authService.userLogout()
      .subscribe(() => this.router.navigate([ APP_ROUTES.AUTH ]));
  }
}
