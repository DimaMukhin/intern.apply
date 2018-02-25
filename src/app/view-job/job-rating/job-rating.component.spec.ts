import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobRatingComponent } from './job-rating.component';
import { InternApiService } from '../../shared/services/intern-api/intern-api.service';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RatingModule } from 'ngx-bootstrap/rating';

describe('JobRatingComponent', () => {
  let component: JobRatingComponent;
  let fixture: ComponentFixture<JobRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, HttpModule, RatingModule],
      declarations: [ JobRatingComponent ],
      providers: [InternApiService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
