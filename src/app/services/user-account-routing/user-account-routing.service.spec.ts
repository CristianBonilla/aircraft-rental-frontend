import { TestBed } from '@angular/core/testing';

import { UserAccountRoutingService } from './user-account-routing.service';

describe('UserAccountRoutingService', () => {
  let service: UserAccountRoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAccountRoutingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
