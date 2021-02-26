import { TestBed } from '@angular/core/testing';

import { UserAccountRedirectService } from './user-account-redirect.service';

describe('UserAccountRedirectService', () => {
  let service: UserAccountRedirectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAccountRedirectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
