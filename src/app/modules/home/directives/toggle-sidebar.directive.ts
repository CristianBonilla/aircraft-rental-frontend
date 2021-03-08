import { AfterViewInit, Directive, Inject, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { WINDOW } from '@core/providers/window.provider';
import { ToggleSidebarService } from '@modules/home/services/toggle-sidebar.service';
import { filter, take } from 'rxjs/operators';
import { routeFromSidebar } from 'src/app/models/routes';

@Directive({
  selector: '[arfToggleSidebar]'
})
export class ToggleSidebarDirective implements OnInit, AfterViewInit {
  private readonly document: Document;
  private readonly $body: HTMLElement;
  private $toggle: HTMLDivElement;
  private $button: HTMLButtonElement;
  private $sidebar: HTMLDivElement;
  private visibleSidebar: boolean;

  get buttonIsVisible() {
    if (!this.$toggle || !this.$button) {
      return false;
    }
    const { display } = this.window.getComputedStyle(this.$button);

    return this.$toggle.contains(this.$button) && display !== 'none';
  }

  constructor(
    @Inject(WINDOW) private window: Window,
    private toggleSidebarService: ToggleSidebarService,
    private router: Router
  ) {
    this.document = this.window.document;
    this.$body = document.body;
  }

  ngOnInit() {
    this.router.events.pipe(
      filter<NavigationEnd>(event => routeFromSidebar(event) && this.buttonIsVisible)
    ).subscribe(_ => this.hideSidebar());
  }

  ngAfterViewInit() {
    this.toggleSidebarService.toggleSidebar$.pipe(
      filter(toggleSidebar => !!toggleSidebar && !!toggleSidebar.$toggle && !!toggleSidebar.$sidebar),
      take(1)
    ).subscribe(toggleSidebar => {
      this.$toggle = toggleSidebar.$toggle;
      this.$sidebar = toggleSidebar.$sidebar;
      this.$button = this.$toggle.querySelector('button');
      this.$button.addEventListener('click', _ => {
        if (this.visibleSidebar) {
          this.hideSidebar();
        } else {
          this.showSidebar();
        }
      });
    });
  }

  private showSidebar() {
    const $layer = this.layerElement();
    setTimeout(() => {
      $layer.classList.add('visible');
    }, 165);  // half the sidebar transition-duration
    this.$body.classList.add('nav-open');
    this.$sidebar.addEventListener('transitionend', () => {
      this.$toggle.classList.add('toggled');
      $layer.addEventListener('click', _ => this.hideSidebar(), { once: true });
    }, { once: true });
    this.visibleSidebar = true;
  }

  private hideSidebar() {
    this.$body.classList.remove('nav-open');
    const $layer = this.layerElement();
    $layer.classList.remove('visible');
    this.$sidebar.addEventListener('transitionend', () => {
      this.$toggle.classList.remove('toggled');
      $layer.remove();
    }, { once: true });
    this.visibleSidebar = false;
  }

  private layerElement(): HTMLDivElement {
    let $layer = this.$body.querySelector<HTMLDivElement>('.close-layer');
    if ($layer) {
      return $layer;
    }
    $layer = this.document.createElement('div');
    $layer.classList.add('close-layer');
    this.$body.appendChild($layer);

    return this.layerElement();
  }
}
