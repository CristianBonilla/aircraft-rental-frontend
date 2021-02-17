import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ToggleService } from '../services/toggle.service';

@Component({
  selector: 'arf-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements AfterViewInit {
  @ViewChild('toggle')
  private readonly toggleRef: ElementRef<HTMLDivElement>;

  constructor(private toggleService: ToggleService) { }

  ngAfterViewInit() {
    this.toggleService.addToggle(this.toggleRef.nativeElement);
  }
}
