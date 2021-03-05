import { Injectable } from '@angular/core';
import { ToggleSidebar } from '@modules/home/models/toggle-sidebar';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleSidebarService {
  private readonly toggleSidebarSubject: BehaviorSubject<ToggleSidebar>;
  readonly toggleSidebar$: Observable<ToggleSidebar>;

  constructor() {
    this.toggleSidebarSubject = new BehaviorSubject(null);
    this.toggleSidebar$ = this.toggleSidebarSubject.asObservable();
  }

  addToggle($toggle: HTMLDivElement) {
    const toggleSidebar = this.toggleSidebarSubject.getValue();
    const $sidebar = !!toggleSidebar && !!toggleSidebar.$sidebar ? toggleSidebar.$sidebar : null;
    this.toggleSidebarSubject.next({ $toggle, $sidebar });
  }

  addSidebar($sidebar: HTMLDivElement) {
    const toggleSidebar = this.toggleSidebarSubject.getValue();
    const $toggle = !!toggleSidebar && !!toggleSidebar.$toggle ? toggleSidebar.$toggle : null;
    this.toggleSidebarSubject.next({ $sidebar, $toggle });
  }
}
