import { Component } from '@angular/core';
import { ThemeChangeService } from '@services/theme-change/theme-change.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'arf-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: [ './theme-toggle.component.scss' ]
})
export class ThemeToggleComponent {
  theme = null;

  get selectedState() {
    return this.theme === null;
  }

  constructor(private themeChange: ThemeChangeService) {
    this.themeChange.theme$.pipe(take(1))
      .subscribe(({ newValue }) => this.theme = newValue);
  }

  toggleTheme() {
    this.theme = this.theme === 'bootstrap-dark' ? null : 'bootstrap-dark';
    this.themeChange.change(this.theme);
  }
}
