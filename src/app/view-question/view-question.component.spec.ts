import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { ViewQuestionComponent } from './view-question.component';
import { InternApiService } from '../shared/services/intern-api/intern-api.service';

describe('ViewQuestionComponent', () => {
  let component: ViewQuestionComponent;
  let fixture: ComponentFixture<ViewQuestionComponent>;
  let service: InternApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        RouterTestingModule
      ],
      declarations: [ ViewQuestionComponent ],
      providers: [ InternApiService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewQuestionComponent);
    component = fixture.componentInstance;
    service = TestBed.get(InternApiService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the question if the question exists', async(() => {
    spyOn(service, 'getQuestionById').and.returnValue(Observable.of({
      id: 1,
      author: 'dima',
      title: 'who is the best?',
      body: 'so who is the best employer?',
      creationTime: '2018-02-26T07:21:29.000Z'
    }));

    component.getQuestion(1);
    fixture.detectChanges();
    
    const deTitle = fixture.debugElement.query(By.css('.question-title'));
    const elTitle: HTMLElement = deTitle.nativeElement;
    const deBody = fixture.debugElement.query(By.css('.question-body'));
    const elBody: HTMLElement = deBody.nativeElement;
    const deAuthor = fixture.debugElement.query(By.css('.question-author'));
    const elAuthor: HTMLElement = deAuthor.nativeElement;

    expect(component.question).toBeTruthy();
    expect(elTitle.innerText).toBe('who is the best?');
    expect(elBody.innerText).toBe('so who is the best employer?');
    expect(elAuthor.innerText).toBe('Asked by: dima');
  }));

  it('should display no question found message on invalid question id', async(() => {
    spyOn(service, 'getQuestionById').and.returnValue(Observable.throw({}));

    component.getQuestion(undefined);
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.question-not-found'));
    let el: HTMLElement = de.nativeElement;

    expect(el).toBeTruthy();
    expect(el.innerText).toBeTruthy();
    expect(component.question).toEqual({});
  }));

  it('should display no question found message on empty question response', async(() => {
    spyOn(service, 'getQuestionById').and.returnValue(Observable.of([]));

    component.getQuestion(undefined);
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.question-not-found'));
    let el: HTMLElement = de.nativeElement;

    expect(el).toBeTruthy();
    expect(el.innerText).toBeTruthy();
    expect(component.question).toEqual([]);
  }));
});
