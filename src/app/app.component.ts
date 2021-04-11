import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Navigation, NavigationStart, Router } from '@angular/router';
import { UserAccountRedirectService } from '@services/user-account-redirect/user-account-redirect.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'arf-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  constructor(private userAccountRedirect: UserAccountRedirectService) { }

  ngOnInit() {
    this.userAccountRedirect.loadUser().pipe(take(1)).subscribe();
  }
}
