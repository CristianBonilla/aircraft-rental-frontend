import { Component } from '@angular/core';
import { IdentityService } from '@services/identity/identity.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'arf-sidebar-wrapper',
  templateUrl: './sidebar-wrapper.component.html',
  styles: []
})
export class SidebarWrapperComponent {
  readonly userName: Observable<string>;

  constructor(private identity: IdentityService) {
    this.userName = this.identity.userAccount$.pipe(
      take(1),
      map(({ user }) => user.firstName));
  }
}
