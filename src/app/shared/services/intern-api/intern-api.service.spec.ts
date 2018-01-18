import { TestBed, inject } from '@angular/core/testing';

import { InternApiService } from './intern-api.service';

describe('InternApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InternApiService],
      imports: []
    });
  });

  it('should be created', inject([InternApiService], (service: InternApiService) => {
    expect(service).toBeTruthy();
  }));
});
