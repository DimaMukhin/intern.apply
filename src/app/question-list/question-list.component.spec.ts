import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterLinkStubDirective } from '../shared/directives/router-link-stub.directive';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { QuestionListComponent } from './question-list.component';
import { InternApiService } from '../shared/services/intern-api/intern-api.service';

describe('QuestionListComponent', () => {
  let component: QuestionListComponent;
  let fixture: ComponentFixture<QuestionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        ReactiveFormsModule
      ],
      declarations: [ 
        QuestionListComponent ,
        RouterLinkStubDirective
      ],
      providers: [ InternApiService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize without showing the "question ask" form', () => {
    let service = TestBed.get(InternApiService);
    let spy = spyOn(service, 'getAllQuestions').and.returnValue(Observable.of([]));

    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.question-ask-form'));
    expect(de).toBeFalsy();
  });

  it('should get all the questions and display them in the correct order', async(() => {
    let service = TestBed.get(InternApiService);
    let spy = spyOn(service, 'getAllQuestions').and.returnValue(Observable.of([
      {id: 1, author: 'dima', title: 'spy on this!', body: 'just a question', creationTime: '2018-02-28T22:03:14.000Z' },
      {id: 2, author: 'ben', title: 'WAT?', body: 'best question', creationTime: '2018-02-26T08:55:00.000Z' },
      {id: 3, author: 'guybrush', title: 'you fight like a dairy farmer!', body: 'How appropriate! You fight like a cow!', creationTime: '2018-02-26T07:21:29.000Z' }
    ]));

    fixture.detectChanges();

    expect(service.getAllQuestions).toHaveBeenCalled();
    let deAuthor = fixture.debugElement.queryAll(By.css('td.question-author'));
    let elAuthor1: HTMLElement = deAuthor[0].nativeElement;
    let elAuthor2: HTMLElement = deAuthor[1].nativeElement;
    let elAuthor3: HTMLElement = deAuthor[2].nativeElement;
    let deTitle = fixture.debugElement.queryAll(By.css('td.question-title'));
    let elTitle1: HTMLElement = deTitle[0].nativeElement;
    let elTitle2: HTMLElement = deTitle[1].nativeElement;
    let elTitle3: HTMLElement = deTitle[2].nativeElement;
    let deTime = fixture.debugElement.queryAll(By.css('td.question-time'));
    let elTime1: HTMLElement = deTime[0].nativeElement;
    let elTime2: HTMLElement = deTime[1].nativeElement;
    let elTime3: HTMLElement = deTime[2].nativeElement;

    expect(elAuthor1.innerText).toBe('dima');
    expect(elAuthor2.innerText).toBe('ben');
    expect(elAuthor3.innerText).toBe('guybrush');
    expect(elTitle1.innerText).toBe('spy on this!');
    expect(elTitle2.innerText).toBe('WAT?');
    expect(elTitle3.innerText).toBe('you fight like a dairy farmer!');
    expect(elTime1.innerText).toBe('Feb 28, 2018');
    expect(elTime2.innerText).toBe('Feb 26, 2018');
    expect(elTime3.innerText).toBe('Feb 26, 2018');
  }));

  it('should show 3 questions', async(() => {
    let service = TestBed.get(InternApiService);
    let spy = spyOn(service, 'getAllQuestions').and.returnValue(Observable.of([
      {id: 1, author: 'dima', title: 'spy on this!', body: 'just a question', creationTime: '2018-02-28T22:03:14.000Z' },
      {id: 2, author: 'ben', title: 'WAT?', body: 'best question', creationTime: '2018-02-26T08:55:00.000Z' },
      {id: 3, author: 'guybrush', title: 'you fight like a dairy farmer!', body: 'How appropriate! You fight like a cow!', creationTime: '2018-02-26T07:21:29.000Z' }
    ]));

    fixture.detectChanges();

    expect(service.getAllQuestions).toHaveBeenCalled();
    let deAuthor = fixture.debugElement.queryAll(By.css('td.question-author'));
    expect(deAuthor.length).toBe(3);
  }));

  it('should display a "no questions" message when there are no questions', async(() => {
    let service = TestBed.get(InternApiService);
    let spy = spyOn(service, 'getAllQuestions').and.returnValue(Observable.of([]));

    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.question-ask-form'));
    let elNoQuestions = fixture.debugElement.query(By.css('.no-questions')).nativeElement;
    expect(de).toBeFalsy();
    expect(elNoQuestions.hidden).toBe(false);
  }));

  it('should hide the "ask" button when the ask form is showing', async(() => {
    let service = TestBed.get(InternApiService);
    let spy = spyOn(service, 'getAllQuestions').and.returnValue(Observable.of([]));

    fixture.detectChanges();
    component.onAskButtonClick();
    fixture.detectChanges();

    let deAskButton = fixture.debugElement.query(By.css('.ask-button'));
    expect(component.showQuestionForm).toBe(true);
    expect(deAskButton).toBeFalsy();
  }));

  it('should hide the form when the "close" button is clicked', async(() => {
    let service = TestBed.get(InternApiService);
    let spy = spyOn(service, 'getAllQuestions').and.returnValue(Observable.of([]));

    fixture.detectChanges();
    component.onAskButtonClick();
    fixture.detectChanges();
    component.onAskButtonClick();
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.question-ask-form'));
    expect(de).toBeFalsy();
  }));

  it('should render invalid name message when trying to ask a question with an invalid name', async(() => {
    let service = TestBed.get(InternApiService);
    spyOn(service, 'addQuestion').and.returnValue(Observable.throw({ json: () => {
      return [{ code: 9 }];
    }}));

    fixture.detectChanges();
    component.showQuestionForm = true;
    component.onQuestionSubmit();
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.name-danger'));
    let el: HTMLElement = de.nativeElement;
    expect(el.hidden).toBe(false);
  }));

  it('should render invalid title message when trying to ask a question with an invalid title', async(() => {
    let service = TestBed.get(InternApiService);
    spyOn(service, 'addQuestion').and.returnValue(Observable.throw({ json: () => {
      return [{ code: 7 }];
    }}));

    fixture.detectChanges();
    component.showQuestionForm = true;
    component.onQuestionSubmit();
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.title-danger'));
    let el: HTMLElement = de.nativeElement;
    expect(el.hidden).toBe(false);
  }));

  it('should render invalid question-body message when trying to ask a question with an invalid body', async(() => {
    let service = TestBed.get(InternApiService);
    spyOn(service, 'addQuestion').and.returnValue(Observable.throw({ json: () => {
      return [{ code: 8 }];
    }}));

    fixture.detectChanges();
    component.showQuestionForm = true;
    component.onQuestionSubmit();
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.question-danger'));
    let el: HTMLElement = de.nativeElement;
    expect(el.hidden).toBe(false);
  }));

  it('should render all invalid fields messages when sending a complete invalid question', async(() => {
    let service = TestBed.get(InternApiService);
    spyOn(service, 'addQuestion').and.returnValue(Observable.throw({ json: () => {
      return [{ code: 7 }, { code: 8 }, { code: 9 }];
    }}));

    fixture.detectChanges();
    component.showQuestionForm = true;
    component.onQuestionSubmit();
    fixture.detectChanges();

    let deTitle = fixture.debugElement.query(By.css('.title-danger'));
    let elTitle: HTMLElement = deTitle.nativeElement;
    let deQuestion = fixture.debugElement.query(By.css('.question-danger'));
    let elQuestion: HTMLElement = deQuestion.nativeElement;
    let deName = fixture.debugElement.query(By.css('.name-danger'));
    let elName: HTMLElement = deName.nativeElement;
    expect(elTitle.hidden).toBe(false);
    expect(elQuestion.hidden).toBe(false);
    expect(elName.hidden).toBe(false);
  }));

  it('should successfully add a new valid question', async(() => {
    let service = TestBed.get(InternApiService);
    let spy = spyOn(service, 'addQuestion').and.returnValue(Observable.of(
      {id: 1, author: 'dima', title: 'spy on this!', body: 'just a question', creationTime: '2018-02-28T22:03:14.000Z' },
    ));

    fixture.detectChanges();
    component.showQuestionForm = true;
    component.onQuestionSubmit();
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.text-success'));
    let el: HTMLElement = de.nativeElement;
    expect(el.hidden).toBe(false);
  }));

  it('should display a "server error" message on server error', async(() => {
    let service = TestBed.get(InternApiService);
    spyOn(service, 'addQuestion').and.returnValue(Observable.throw([false]));

    fixture.detectChanges();
    component.showQuestionForm = true;
    component.onQuestionSubmit();
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.text-warning'));
    let el: HTMLElement = de.nativeElement;
    expect(el.hidden).toBe(false);
  }));

});
