import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Toggle {
  $toggle?: HTMLDivElement;
  $sidebar?: HTMLDivElement;
}

@Injectable({
  providedIn: 'root'
})
export class ToggleService {
  private readonly toggleSubject: BehaviorSubject<Toggle>;
  readonly toggle$: Observable<Toggle>;

  constructor() {
    this.toggleSubject = new BehaviorSubject(null);
    this.toggle$ = this.toggleSubject.asObservable();
  }

  addToggle($toggle: HTMLDivElement) {
    const toggle = this.toggleSubject.getValue();
    const $sidebar = !!toggle && !!toggle.$sidebar ? toggle.$sidebar : null;
    this.toggleSubject.next({ $toggle, $sidebar });
  }

  addSidebar($sidebar: HTMLDivElement) {
    const toggle = this.toggleSubject.getValue();
    const $toggle = !!toggle && !!toggle.$toggle ? toggle.$toggle : null;
    this.toggleSubject.next({ $sidebar, $toggle });
  }
}
