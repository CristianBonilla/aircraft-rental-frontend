import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '@services/authorization/authorization.service';
import { IdentityService } from '@services/identity/identity.service';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'arf-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  constructor(
    private identity: IdentityService,
    private authorization: AuthorizationService
  ) { }

  ngOnInit() {
    this.identity.refreshUser().pipe(
      filter(userAccount => !!userAccount),
      take(1))
    .subscribe(userAccount => this.authorization.loadRoleAndPermissions(userAccount));
  }
}
