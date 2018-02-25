import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { JobListComponent } from './job-list.component';
import { InternApiService } from '../shared/services/intern-api/intern-api.service';
import { RouterLinkStubDirective } from '../shared/directives/router-link-stub.directive';

describe('JobListComponent', () => {
  let component: JobListComponent;
  let fixture: ComponentFixture<JobListComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, RouterTestingModule],
      declarations: [JobListComponent, RouterLinkStubDirective],
      providers: [InternApiService]
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

  it('should get all jobs from the server and display them', async(() => {
    let service = TestBed.get(InternApiService);
    spyOn(service, 'getAllJobs').and.returnValue(Observable.from([[
      { title: 'Software Developer', organization: 'C1', location: 'Toronto' },
      { title: 'Software Engineer', organization: 'C2', location: 'Winnipeg' },
      { title: 'Soft Dev', organization: 'C3', location: 'Vancouver' }
    ]]));

    fixture.detectChanges();

    let deAuthor = fixture.debugElement.queryAll(By.css('.job-title'));
    
    let elAuthor1: HTMLElement = deAuthor[0].nativeElement;
    let elAuthor2: HTMLElement = deAuthor[1].nativeElement;
    let elAuthor3: HTMLElement = deAuthor[2].nativeElement;

    deAuthor = fixture.debugElement.queryAll(By.css('.job-org'));

    let elAuthor4: HTMLElement = deAuthor[0].nativeElement;
    let elAuthor5: HTMLElement = deAuthor[1].nativeElement;
    let elAuthor6: HTMLElement = deAuthor[2].nativeElement;

    deAuthor = fixture.debugElement.queryAll(By.css('.job-loc'));

    let elAuthor7: HTMLElement = deAuthor[0].nativeElement;
    let elAuthor8: HTMLElement = deAuthor[1].nativeElement;
    let elAuthor9: HTMLElement = deAuthor[2].nativeElement;
    
    
    expect(elAuthor1.innerText).toBe('Software Developer');
    expect(elAuthor2.innerText).toBe('Software Engineer');
    expect(elAuthor3.innerText).toBe('Soft Dev');

    expect(elAuthor4.innerText).toBe('C1');
    expect(elAuthor5.innerText).toBe('C2');
    expect(elAuthor6.innerText).toBe('C3');

    expect(elAuthor7.innerText).toBe('Toronto');
    expect(elAuthor8.innerText).toBe('Winnipeg');
    expect(elAuthor9.innerText).toBe('Vancouver');

    expect(component.jobs.length).toBe(3);

    expect(component.jobs[2].title).toBe('Soft Dev');
    expect(component.jobs[2].organization).toBe('C3');
    expect(component.jobs[2].location).toBe('Vancouver');

  }));

  it('should return an empty job list on error', () => {
    let service = TestBed.get(InternApiService);
    spyOn(service, 'getAllJobs').and.returnValue(Observable.throw(null));

    fixture.detectChanges();

    expect(component.jobs.length).toBe(0);
  });


  it('should return filtered job list from the server and display it', () => {
    let service = TestBed.get(InternApiService);
    spyOn(service, 'getAllJobs').and.callFake(function(Soft){
      return Observable.from([[
    { title: 'Software Developer', organization: 'C1', location: 'Toronto' },
    { title: 'Software Engineer', organization: 'C2', location: 'Winnipeg' },
    { title: 'Soft Dev', organization: 'C3', location: 'Vancouver' }
        ]])
    });

    component.jobs=component.filterJobs("Soft");
    fixture.detectChanges();


    let deAuthor = fixture.debugElement.queryAll(By.css('.job-title'));
    
    let elAuthor1: HTMLElement = deAuthor[0].nativeElement;
    let elAuthor2: HTMLElement = deAuthor[1].nativeElement;
    let elAuthor3: HTMLElement = deAuthor[2].nativeElement;

    deAuthor = fixture.debugElement.queryAll(By.css('.job-org'));

    let elAuthor4: HTMLElement = deAuthor[0].nativeElement;
    let elAuthor5: HTMLElement = deAuthor[1].nativeElement;
    let elAuthor6: HTMLElement = deAuthor[2].nativeElement;

    deAuthor = fixture.debugElement.queryAll(By.css('.job-loc'));

    let elAuthor7: HTMLElement = deAuthor[0].nativeElement;
    let elAuthor8: HTMLElement = deAuthor[1].nativeElement;
    let elAuthor9: HTMLElement = deAuthor[2].nativeElement;
    
    
    expect(elAuthor1.innerText).toBe('Software Developer');
    expect(elAuthor2.innerText).toBe('Software Engineer');
    expect(elAuthor3.innerText).toBe('Soft Dev');

    expect(elAuthor4.innerText).toBe('C1');
    expect(elAuthor5.innerText).toBe('C2');
    expect(elAuthor6.innerText).toBe('C3');

    expect(elAuthor7.innerText).toBe('Toronto');
    expect(elAuthor8.innerText).toBe('Winnipeg');
    expect(elAuthor9.innerText).toBe('Vancouver');
  });

  it('should show warning for exceeing search query length', async(() => {
    let service = TestBed.get(InternApiService);
    spyOn(service, 'getAllJobs').and.returnValue(Observable.of([]));

    let ret = component.filterJobs("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy ");
    fixture.detectChanges();

    expect(ret).toEqual(undefined);

    let deAuthor = fixture.debugElement.queryAll(By.css('.long-query'));
    let elAuthor1: HTMLElement = deAuthor[0].nativeElement;

    expect(elAuthor1.innerText).toBe('Search query too long! (Max characters allowed 100)');

  }));

  it('should show message that no jobs were found', async(() => {
    let service = TestBed.get(InternApiService);
    spyOn(service, 'getAllJobs').and.returnValue(Observable.of([]));

    let ret = component.filterJobs("Random Text");
    fixture.detectChanges();

    expect(ret.toLocaleString.length).toEqual(0);

    let deAuthor = fixture.debugElement.queryAll(By.css('.no-job'));

    let elAuthor1: HTMLElement = deAuthor[0].nativeElement;

    expect(elAuthor1.innerText).toBe('No Jobs Found!');

  }));

});