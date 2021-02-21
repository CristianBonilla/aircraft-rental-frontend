import { Component } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';
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

  constructor(authService: AuthService) {
    this.loading$ = authService.loading$;
  }
}
