import { TestBed } from '@angular/core/testing';

import { Feed2jsonService } from './feed2json.service';

describe('Feed2jsonService', () => {
  let service: Feed2jsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Feed2jsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
