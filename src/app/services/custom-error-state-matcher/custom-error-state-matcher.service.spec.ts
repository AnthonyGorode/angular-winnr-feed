import { TestBed } from '@angular/core/testing';

import { CustomErrorStateMatcherService } from './custom-error-state-matcher.service';

describe('CustomErrorStateMatcherService', () => {
  let service: CustomErrorStateMatcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomErrorStateMatcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
