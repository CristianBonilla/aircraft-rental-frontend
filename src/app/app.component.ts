import { Component, Inject, OnInit } from '@angular/core';
import { WINDOW } from '@core/providers/window.provider';
import { ThemeChangeService } from '@services/theme-change/theme-change.service';
import { UserAccountRedirectService } from '@services/user-account-redirect/user-account-redirect.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'arf-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  private readonly $body: HTMLElement;

  constructor(
    private userAccountRedirect: UserAccountRedirectService,
    private themeChange: ThemeChangeService,
    @Inject(WINDOW) { document }: Window
  ) {
    this.$body = document.body;
  }

  ngOnInit() {
    this.userAccountRedirect.loadUser().pipe(take(1)).subscribe();
    this.themeChange.theme$.subscribe(theme => {
      this.$body.classList.remove(theme.oldValue);
      if (!!theme.newValue) {
        this.$body.classList.add(theme.newValue);
      }
    });
  }
}
