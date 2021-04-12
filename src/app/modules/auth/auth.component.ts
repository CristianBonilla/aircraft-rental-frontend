import { Component } from '@angular/core';
import { IdentityService } from '@services/identity/identity.service';
import { take } from 'rxjs/operators';
import { DEFAULT_SCROLLBAR_OPTIONS, ScrollbarOptions } from 'src/app/models/scrollbar';

enum AuthType {
  Register,
  Login
}

@Component({
  selector: 'arf-auth',
  templateUrl: './auth.component.html',
  styles: []
})
export class AuthComponent {
  readonly scrollbarOptions: ScrollbarOptions = {
    ...DEFAULT_SCROLLBAR_OPTIONS,
    overflowBehavior: {
      x: 'visible-hidden'
    }
  };
  readonly type = AuthType;
  auth = this.type.Login;
  loading = false;

  constructor(identity: IdentityService) {
    // ensure that all information is removed from local storage
    identity.userLogout().pipe(take(1)).subscribe();
  }
}
