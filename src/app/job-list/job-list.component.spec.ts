import { NgxPaginationModule } from 'ngx-pagination';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs';

import { JobListComponent } from './job-list.component';
import { InternApiService } from '../shared/services/intern-api/intern-api.service';
import { RouterLinkStubDirective } from '../shared/directives/router-link-stub.directive';
import { By } from '@angular/platform-browser';

describe('JobListComponent', () => {
  let component: JobListComponent;
  let fixture: ComponentFixture<JobListComponent>;
  let service: InternApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        NgxPaginationModule
      ],
      declarations: [
        JobListComponent,
        RouterLinkStubDirective
      ],
      providers: [
        InternApiService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobListComponent);
    component = fixture.componentInstance;
    service = TestBed.get(InternApiService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all jobs from the server', async(() => {
    spyOn(service, 'getAllJobs').and.returnValue(Observable.from([[
      { title: 'test title 1', organization: 'C1' },
      { title: 'test title 2', organization: 'C2' },
      { title: 'test title 3', organization: 'C3' }
    ]]));

    fixture.detectChanges();

    expect(component.jobs.length).toBe(3);

    expect(component.jobs[2].title).toBe('test title 3');
    expect(component.jobs[2].organization).toBe('C3');

  }));

  it('should return an empty job list on error', () => {
    spyOn(service, 'getAllJobs').and.returnValue(Observable.throw(null));

    fixture.detectChanges();

    expect(component.jobs.length).toBe(0);
  });

  it('should display set number of jobs per page when number of jobs greater than jobPerPage', async(() => {
    let testJobs = [];
 
    //Adding more than jobsPerPage jobs
    for (let i = 0; i < component.jobsPerPage + 20; i++) {
      testJobs.push({
        title: `title ${i + 1}`,
        organization: `organization ${i + 1}`
      });
    }

    spyOn(service, 'getAllJobs').and.returnValue(Observable.from([testJobs]));

    fixture.detectChanges();

    let de = fixture.debugElement.queryAll(By.css('.list-group-item'));
    
    expect(component.jobs.length).toBe(testJobs.length);
    expect(de.length).toBe(component.jobsPerPage);
  }));

  it('should display all the jobs when number of jobs less than jobsPerPage', async(() => {   
    let testJobs = [];
 
    //Adding less than jobsPerPage jobs
    for (let i = 0; i < component.jobsPerPage - 1; i++) {
      testJobs.push({
        title: `title ${i + 1}`,
        organization: `organization ${i + 1}`
      });
    }

    spyOn(service, 'getAllJobs').and.returnValue(Observable.from([testJobs]));

    fixture.detectChanges();

    let de = fixture.debugElement.queryAll(By.css('.list-group-item'));

    expect(component.jobs.length).toBe(testJobs.length);
    expect(de.length).toBe(testJobs.length);
  }));
});