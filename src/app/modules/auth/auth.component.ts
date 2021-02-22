import { Component } from '@angular/core';
import { IdentityService } from '@services/identity/identity.service';
import { Observable } from 'rxjs';

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
  readonly loading$: Observable<boolean>;
  readonly type = AuthType;
  auth = this.type.Login;

  constructor(identity: IdentityService) {
    this.loading$ = identity.loading$;
  }
}
