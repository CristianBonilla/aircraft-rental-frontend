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
  type = AuthType;
  auth = AuthType.Login;
}
