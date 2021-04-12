import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Theme {
  oldValue: string;
  newValue: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeChangeService {
  private readonly start: Theme = {
    oldValue: null,
    newValue: null
  };
  private readonly themeSubject = new BehaviorSubject(this.start);
  readonly theme$: Observable<Theme>;

  constructor() {
    this.theme$ = this.themeSubject.asObservable();
  }

  change(theme: string) {
    this.themeSubject.next({
      oldValue: this.themeSubject.value.newValue,
      newValue: theme
    });
  }
}
