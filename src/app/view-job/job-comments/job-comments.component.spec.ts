import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { JobCommentsComponent } from './job-comments.component';
import { InternApiService } from '../../shared/services/intern-api/intern-api.service';

describe('JobCommentsComponent', () => {
  let component: JobCommentsComponent;
  let fixture: ComponentFixture<JobCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      declarations: [ JobCommentsComponent ],
      providers: [ InternApiService ]
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

  it('should get all comments for a valid job id', async(() => {
    let service = TestBed.get(InternApiService);
    spyOn(service, 'getAllCommentsOfJob').and.returnValue(Observable.of([
      { author: 'dima', message: 'test' },
      { author: 'ben', message: 'test2' },
      { author: 'cyka', message: 'blyat' }
    ]));

    component.jobID = 1;
    component.getAllComments();
    fixture.detectChanges();

    expect(component.comments.length).toBe(3);
  }));

  it('should not get any comments for an invalid job id', async(() => {
    let service = TestBed.get(InternApiService);
    spyOn(service, 'getAllCommentsOfJob').and.returnValue(Observable.of([
      { author: 'dima', message: 'test' },
      { author: 'ben', message: 'test2' },
      { author: 'cyka', message: 'blyat' }
    ]));

    component.jobID = 0;
    component.getAllComments();
    fixture.detectChanges();

    expect(component.comments.length).toBe(0);
  }));

  it('shoul display all comments for a valid job id', async(() => {
    let service = TestBed.get(InternApiService);
    spyOn(service, 'getAllCommentsOfJob').and.returnValue(Observable.of([
      { author: 'dima', message: 'test' },
      { author: 'ben', message: 'test2' },
      { author: 'cyka', message: 'blyat' }
    ]));

    component.jobID = 1;
    component.getAllComments();
    fixture.detectChanges();

    let deAuthor = fixture.debugElement.queryAll(By.css('.cm-author'));
    let elAuthor1: HTMLElement = deAuthor[0].nativeElement;
    let elAuthor2: HTMLElement = deAuthor[1].nativeElement;
    let elAuthor3: HTMLElement = deAuthor[2].nativeElement;
    let deMessage = fixture.debugElement.queryAll(By.css('.cm-message'));
    let elMessage1: HTMLElement = deMessage[0].nativeElement;
    let elMessage2: HTMLElement = deMessage[1].nativeElement;
    let elMessage3: HTMLElement = deMessage[2].nativeElement;
    
    expect(deAuthor.length).toBe(3);
    expect(deMessage.length).toBe(3);
    expect(elAuthor1.innerText).toBe('dima');
    expect(elAuthor2.innerText).toBe('ben');
    expect(elAuthor3.innerText).toBe('cyka');
    expect(elMessage1.innerText).toBe('test');
    expect(elMessage2.innerText).toBe('test2');
    expect(elMessage3.innerText).toBe('blyat');
    expect(component.comments.length).toBe(3);
  }));

  it('shoul not display any comments for an invalid job id', async(() => {
    let service = TestBed.get(InternApiService);
    spyOn(service, 'getAllCommentsOfJob').and.returnValue(Observable.of([]));

    component.jobID = 0;
    component.getAllComments();
    fixture.detectChanges();

    let deAuthor = fixture.debugElement.queryAll(By.css('.cm-author'));
    let deMessage = fixture.debugElement.queryAll(By.css('.cm-message'));
    
    expect(deAuthor.length).toBe(0);
    expect(deMessage.length).toBe(0);
    expect(component.comments.length).toBe(0);
  }));
});
