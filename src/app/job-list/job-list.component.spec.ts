import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs';

import { JobListComponent } from './job-list.component';
import { InternApiService } from '../shared/services/intern-api/intern-api.service';

describe('JobListComponent', () => {
  let component: JobListComponent;
  let fixture: ComponentFixture<JobListComponent>;

  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      declarations: [ JobListComponent ],
      providers: [ InternApiService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all jobs from the server', async(() => {
    let service = TestBed.get(InternApiService);
    spyOn(service, 'getAllJobs').and.returnValue(Observable.from([[
      {title: 'test title 1'},
      {title: 'test title 2'},
      {title: 'test title 3'}
    ]]));

    fixture.detectChanges();
    
    expect(component.jobs.length).toBe(3);
  }));

  it('should return an empty job list on error', () => {
    let service = TestBed.get(InternApiService);
    spyOn(service, 'getAllJobs').and.returnValue(Observable.throw(null));

    fixture.detectChanges();
    
    expect(component.jobs.length).toBe(0);
  });
});