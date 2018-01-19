import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { InternApiService } from './intern-api.service';

describe('InternApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InternApiService],
      imports: [ HttpModule ]
    });
  });

  it('should be created', inject([InternApiService], (service: InternApiService) => {
    expect(service).toBeTruthy();
  }));
});
