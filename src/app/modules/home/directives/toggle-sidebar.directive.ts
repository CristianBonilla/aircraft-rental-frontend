import { AfterViewInit, Directive, Inject } from '@angular/core';
import { WINDOW } from '@core/providers/window.provider';
import { ToggleSidebar } from '@modules/home/models/toggle-sidebar';
import { ToggleSidebarService } from '@modules/home/services/toggle-sidebar.service';
import { filter, take } from 'rxjs/operators';

@Directive({
  selector: '[arfToggleSidebar]'
})
export class ToggleSidebarDirective implements AfterViewInit {
  private readonly document: Document;
  private readonly $body: HTMLElement;
  private toggleSidebar: ToggleSidebar;
  private visibleSidebar: boolean;

  constructor(
    @Inject(WINDOW) { document }: Window,
    private toggleSidebarService: ToggleSidebarService
  ) {
    this.document = document;
    this.$body = document.body;
  }

  ngAfterViewInit() {
    this.toggleSidebarService.toggleSidebar$.pipe(
      filter(toggleSidebar => !!toggleSidebar && !!toggleSidebar.$toggle && !!toggleSidebar.$sidebar),
      take(1)
    ).subscribe(toggleSidebar => {
      this.toggleSidebar = toggleSidebar;
      const $button = this.toggleSidebar.$toggle.querySelector('button');
      $button.addEventListener('click', _ => {
        if (this.visibleSidebar) {
          this.hideSidebar();
        } else {
          this.showSidebar();
        }
      });
    });
  }

  showSidebar() {
    const $layer = this.layerElement();
    setTimeout(() => {
      $layer.classList.add('visible');
    }, 100);
    this.$body.classList.add('nav-open');
    this.toggleSidebar.$sidebar.addEventListener('transitionend', () => {
      this.toggleSidebar.$toggle.classList.add('toggled');
      $layer.addEventListener('click', _ => this.hideSidebar(), { once: true });
    }, { once: true });
    this.visibleSidebar = true;
  }

  hideSidebar() {
    this.$body.classList.remove('nav-open');
    const $layer = this.layerElement();
    $layer.classList.remove('visible');
    this.toggleSidebar.$sidebar.addEventListener('transitionend', () => {
      this.toggleSidebar.$toggle.classList.remove('toggled');
      $layer.remove();
    }, { once: true });
    this.visibleSidebar = false;
  }

  layerElement(): HTMLDivElement {
    let $layer = this.$body.querySelector('.close-layer');
    if ($layer) {
      return $layer as HTMLDivElement;
    }
    $layer = this.document.createElement('div');
    $layer.classList.add('close-layer');
    this.$body.appendChild($layer);

    return this.layerElement();
  }
}
