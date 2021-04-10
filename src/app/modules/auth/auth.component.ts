import { Component } from '@angular/core';
import { IdentityService } from '@services/identity/identity.service';
import { take } from 'rxjs/operators';

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
  readonly type = AuthType;
  auth = this.type.Login;
  loading = false;

  constructor(identity: IdentityService) {
    // ensure that all information is removed from local storage
    identity.userLogout().pipe(take(1)).subscribe();
  }
}
