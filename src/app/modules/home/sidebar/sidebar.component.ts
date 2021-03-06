import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { WINDOW } from '@core/providers/window.provider';
import { ToggleSidebarService } from '@modules/home/services/toggle-sidebar.service';
import { AuthorizationService } from '@services/authorization/authorization.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'arf-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements AfterViewInit {
  @ViewChild('sidebar')
  readonly sidebarRef: ElementRef<HTMLDivElement>;
  private readonly $body: HTMLElement;
  readonly startRedirect$: Observable<string>;

  constructor(
    @Inject(WINDOW) { document }: Window,
    private toggleSidebar: ToggleSidebarService,
    authorization: AuthorizationService
  ) {
    this.$body = document.body;
    this.startRedirect$ = authorization.startRedirect$;
  }

  ngAfterViewInit() {
    this.toggleSidebar.addSidebar(this.sidebarRef.nativeElement);
  }

  minimize() {
    this.$body.classList.toggle('sidebar-mini');
  }
}
