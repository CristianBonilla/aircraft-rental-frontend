import { Component, Inject, OnInit } from '@angular/core';
import { WINDOW } from '@core/providers/window.provider';

@Component({
  selector: 'arf-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  private readonly $body: HTMLElement;

  constructor(@Inject(WINDOW) { document }: Window) {
    this.$body = document.body;
  }

  ngOnInit() {
    this.$body.classList.add('sidebar-mini');
  }
}
