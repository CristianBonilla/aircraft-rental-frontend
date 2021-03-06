import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserResponse } from '@modules/auth/models/authentication';
import { IdentityService } from '@services/identity/identity.service';
import { delay, take, tap } from 'rxjs/operators';

@Component({
  selector: 'arf-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {
  private readonly loadingSubject = new BehaviorSubject(false);
  readonly loading$: Observable<boolean>;
  users$ = of<UserResponse[]>([]);

  constructor(private identity: IdentityService) {
    this.loading$ = this.loadingSubject.asObservable();
  }

  ngOnInit() {
    this.refreshUsers();
  }

  private refreshUsers() {
    this.loadingSubject.next(true);
    this.users$ = this.identity.fetchUsers().pipe(delay(2000),
      take(1), tap(_ => this.loadingSubject.next(false)));
  }
}
