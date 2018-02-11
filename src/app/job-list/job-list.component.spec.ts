import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router/';
import { RouterModule } from '@angular/router';


import { JobListComponent } from './job-list.component';
import { InternApiService } from '../shared/services/intern-api/intern-api.service';

describe('JobListComponent', () => {
  let component: JobListComponent;
  let fixture: ComponentFixture<JobListComponent>;

  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, RouterModule],
      declarations: [JobListComponent],
      providers: [InternApiService, { provide: ActivatedRoute, useValue: fakeActivatedRoute }],

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
    let service = TestBed.get(InternApiService);
    spyOn(service, 'getAllJobs').and.returnValue(Observable.throw(null));

    fixture.detectChanges();

    expect(component.jobs.length).toBe(0);
  });

  it('should return filtered job list from the server', () => {
    let service = TestBed.get(InternApiService);
    spyOn(service, 'filterJobs').and.returnValue(Observable.from([[
      { title: 'Software Devloper', organization: 'C1' },
      { title: 'Software Engineer', organization: 'C2' },
      { title: 'Soft Dev', organization: 'C3' }
    ]]));

    fixture.detectChanges();

    expect(component.jobs.length).toBe(3);
    expect(component.jobs[2].title).toBe('Soft Dev');
    expect(component.jobs[2].organization).toBe('C3');

  });


});