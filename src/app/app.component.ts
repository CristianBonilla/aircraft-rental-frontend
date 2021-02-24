import { Component, OnInit } from '@angular/core';
import { IdentityService } from '@services/identity/identity.service';

@Component({
  selector: 'arf-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  constructor(private identity: IdentityService) { }

  ngOnInit() {
    this.identity.loadUserAndAuthorization();
  }
}
