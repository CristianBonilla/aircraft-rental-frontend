import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { WINDOW } from '@core/providers/window.provider';
import { ToggleService } from '@modules/home/services/toggle.service';

@Component({
  selector: 'arf-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements AfterViewInit {
  @ViewChild('sidebar')
  private readonly sidebarRef: ElementRef<HTMLDivElement>;

  private readonly $body: HTMLElement;

  constructor(@Inject(WINDOW) { document }: Window, private toggleService: ToggleService) {
    this.$body = document.body;
  }

  ngAfterViewInit() {
    this.toggleService.addSidebar(this.sidebarRef.nativeElement);
  }

  minimize() {
    this.$body.classList.toggle('sidebar-mini');
  }
}
