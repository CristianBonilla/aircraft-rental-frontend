import { AfterViewInit, Directive, Inject } from '@angular/core';
import { WINDOW } from '@core/providers/window.provider';
import { Toggle, ToggleService } from '@modules/home/services/toggle.service';
import { filter, take } from 'rxjs/operators';

@Directive({
  selector: '[arfToggle]'
})
export class ToggleDirective implements AfterViewInit {
  private readonly document: Document;
  private readonly $body: HTMLElement;
  private toggle: Toggle;
  private visibleSidebar: boolean;

  constructor(@Inject(WINDOW) { document }: Window, private toggleService: ToggleService) {
    this.document = document;
    this.$body = document.body;
  }

  ngAfterViewInit() {
    this.toggleService.toggle$.pipe(
      filter(toggle => !!toggle && !!toggle.$toggle && !!toggle.$sidebar),
      take(1)
    ).subscribe(toggle => {
      this.toggle = toggle;
      const $button = this.toggle.$toggle.querySelector('button');
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
    this.toggle.$sidebar.addEventListener('transitionend', () => {
      this.toggle.$toggle.classList.add('toggled');
      $layer.addEventListener('click', _ => this.hideSidebar(), { once: true });
    }, { once: true });
    this.visibleSidebar = true;
  }

  hideSidebar() {
    this.$body.classList.remove('nav-open');
    const $layer = this.layerElement();
    $layer.classList.remove('visible');
    this.toggle.$sidebar.addEventListener('transitionend', () => {
      this.toggle.$toggle.classList.remove('toggled');
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
