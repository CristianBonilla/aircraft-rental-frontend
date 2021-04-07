import { Component, Inject, OnInit } from '@angular/core';
import { WINDOW } from '@core/providers/window.provider';
import { DEFAULT_SCROLLBAR_OPTIONS } from 'src/app/models/scrollbar';

@Component({
  selector: 'arf-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  readonly scrollbarOptions = DEFAULT_SCROLLBAR_OPTIONS;
  private readonly $body: HTMLElement;

  constructor(@Inject(WINDOW) { document }: Window) {
    this.$body = document.body;
  }

  ngOnInit() {
    this.$body.classList.add('sidebar-mini');
  }
}
