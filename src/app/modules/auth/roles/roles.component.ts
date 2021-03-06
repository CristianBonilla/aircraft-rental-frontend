import { Component, OnInit } from '@angular/core';
import { RoleResponse } from '@modules/auth/models/role';
import { RefreshService } from '@services/refresh/refresh.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'arf-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  readonly loading$: Observable<boolean>;
  readonly roles$: Observable<RoleResponse[]>;

  constructor(private refresh: RefreshService) {
    const { loading$, data$ } = this.refresh.roles;
    this.loading$ = loading$;
    this.roles$ = data$;
  }

  ngOnInit() {
    this.refresh.dispatchRoles();
  }
}
