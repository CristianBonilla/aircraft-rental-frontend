import { Component, Inject, OnInit } from '@angular/core';
import { RefreshUsers, REFRESH_USERS } from '@core/providers/refresh.provider';
import { UserResponse } from '@modules/auth/models/authentication';
import { RoleResponse } from '@modules/auth/models/role';
import { Observable } from 'rxjs';
import { DEFAULT_SCROLLBAR_OPTIONS, ScrollbarOptions } from 'src/app/models/scrollbar';

@Component({
  selector: 'arf-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {
  readonly scrollbarOptions: ScrollbarOptions = {
    ...DEFAULT_SCROLLBAR_OPTIONS,
    overflowBehavior: {
      y: 'visible-hidden'
    }
  };
  readonly loading$: Observable<boolean>;
  readonly users$: Observable<UserResponse[]>;
  readonly roles$: Observable<RoleResponse[]>;

  constructor(@Inject(REFRESH_USERS) private refresh: RefreshUsers) {
    this.loading$ = this.refresh.loading$;
    this.users$ = this.refresh.data$;
  }

  ngOnInit() {
    this.refresh.dispatch();
  }

  trackByUser(_: number, userResponse: UserResponse) {
    return userResponse.id;
  }
}
