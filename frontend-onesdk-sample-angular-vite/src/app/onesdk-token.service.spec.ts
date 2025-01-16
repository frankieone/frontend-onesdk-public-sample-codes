import { TestBed } from '@angular/core/testing';

import { OnesdkTokenService } from './onesdk-token.service';

describe('OnesdkTokenService', () => {
  let service: OnesdkTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnesdkTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
