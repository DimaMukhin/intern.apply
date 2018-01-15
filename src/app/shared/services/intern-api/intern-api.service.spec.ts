import { TestBed, inject } from '@angular/core/testing';

import { InternApiService } from './intern-api.service';

describe('InternApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InternApiService]
    });
  });

  it('should be created', inject([InternApiService], (service: InternApiService) => {
    expect(service).toBeTruthy();
  }));
});
