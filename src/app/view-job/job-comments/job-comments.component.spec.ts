import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCommentsComponent } from './job-comments.component';

describe('JobCommentsComponent', () => {
  let component: JobCommentsComponent;
  let fixture: ComponentFixture<JobCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
