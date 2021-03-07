import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponse } from '@modules/auth/models/authentication';
import { RefreshUsers, REFRESH_USERS } from '@core/providers/refresh.provider';

@Component({
  selector: 'arf-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {
  readonly loading$: Observable<boolean>;
  readonly users$: Observable<UserResponse[]>;

  constructor(@Inject(REFRESH_USERS) private refresh: RefreshUsers) {
    this.loading$ = this.refresh.loading$;
    this.users$ = this.refresh.data$;
  }

  ngOnInit() {
    this.refresh.dispatch();
  }
}
