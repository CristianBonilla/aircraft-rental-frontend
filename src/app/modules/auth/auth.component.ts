import { Component } from '@angular/core';

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
}
