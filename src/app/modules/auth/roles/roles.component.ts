import { Component, Inject, OnInit } from '@angular/core';
import { RefreshRoles, REFRESH_ROLES } from '@core/providers/refresh.provider';
import { RoleResponse } from '@modules/auth/models/role';
import { Observable } from 'rxjs';
import { DEFAULT_SCROLLBAR_OPTIONS, ScrollbarOptions } from 'src/app/models/scrollbar';

@Component({
  selector: 'arf-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  readonly scrollbarOptions: ScrollbarOptions = {
    ...DEFAULT_SCROLLBAR_OPTIONS,
    overflowBehavior: {
      y: 'visible-hidden'
    }
  };
  readonly loading$: Observable<boolean>;
  readonly roles$: Observable<RoleResponse[]>;

  constructor(@Inject(REFRESH_ROLES) private refresh: RefreshRoles) {
    this.loading$ = this.refresh.loading$;
    this.roles$ = this.refresh.data$;
  }

  ngOnInit() {
    this.refresh.dispatch();
  }
}
