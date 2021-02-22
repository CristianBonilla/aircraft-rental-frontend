import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { WINDOW } from '@core/providers/window.provider';
import { ToggleService } from '@modules/home/services/toggle.service';
import { AuthorizationService } from '@services/authorization/authorization.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'arf-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements AfterViewInit {
  @ViewChild('sidebar')
  private readonly sidebarRef: ElementRef<HTMLDivElement>;

  private readonly $body: HTMLElement;
  readonly startRedirect$: Observable<string>;

  constructor(
    @Inject(WINDOW) { document }: Window,
    private toggle: ToggleService,
    authorization: AuthorizationService) {
    this.$body = document.body;
    this.startRedirect$ = authorization.startRedirect$;
  }

  ngAfterViewInit() {
    this.toggle.addSidebar(this.sidebarRef.nativeElement);
  }

  minimize() {
    this.$body.classList.toggle('sidebar-mini');
  }
}
