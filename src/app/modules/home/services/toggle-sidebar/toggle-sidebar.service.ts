import { Injectable } from '@angular/core';
import { ToggleSidebar } from '@modules/home/models/toggle-sidebar';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleSidebarService {
  private readonly toggleSubject: BehaviorSubject<ToggleSidebar>;
  readonly toggle$: Observable<ToggleSidebar>;

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
