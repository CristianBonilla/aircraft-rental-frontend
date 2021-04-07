import { Component, Inject, OnInit } from '@angular/core';
import { WINDOW } from '@core/providers/window.provider';
import { DEFAULT_SCROLLBAR_OPTIONS, ScrollbarOptions } from 'src/app/models/scrollbar';

@Component({
  selector: 'arf-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  readonly scrollbarOptions: ScrollbarOptions = {
    ...DEFAULT_SCROLLBAR_OPTIONS,
    overflowBehavior: {
      x: 'visible-hidden'
    }
  };
  private readonly $body: HTMLElement;

  constructor(@Inject(WINDOW) { document }: Window) {
    this.$body = document.body;
  }

  ngOnInit() {
    this.$body.classList.add('sidebar-mini');
  }
}
