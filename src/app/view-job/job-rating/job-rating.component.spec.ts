import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobRatingComponent } from './job-rating.component';

describe('JobRatingComponent', () => {
  let component: JobRatingComponent;
  let fixture: ComponentFixture<JobRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobRatingComponent ]
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
