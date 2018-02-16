import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { AddCommentComponent } from './add-comment.component';
import { InternApiService } from '../../shared/services/intern-api/intern-api.service';

describe('AddCommentComponent', () => {
  let component: AddCommentComponent;
  let fixture: ComponentFixture<AddCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpModule ],
      declarations: [ AddCommentComponent ],
      providers: [ InternApiService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a comment on valid comment addition', async(() => {
    let service = TestBed.get(InternApiService);
    spyOn(service, 'addComment').and.returnValue(Observable.of(true));

    component.onCommentSubmit();
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.text-success'));
    let el: HTMLElement = de.nativeElement;
    expect(el.hidden).toBe(false);
    expect(component.commentSent).toBe(true);
  }));

  it('should render server error message on unknown server error when adding a comment', async(() => {
    let service = TestBed.get(InternApiService);
    spyOn(service, 'addComment').and.returnValue(Observable.throw([false]));

    component.onCommentSubmit();
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.text-warning'));
    let el: HTMLElement = de.nativeElement;
    expect(el.hidden).toBe(false);
  }));

  it('should render invalid message body message when adding a comment with invalid message body', async(() => {
    let service = TestBed.get(InternApiService);
    spyOn(service, 'addComment').and.returnValue(Observable.throw({ json: () => {
      return [{ code: 5 }];
    }}));

    component.onCommentSubmit();
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.message-danger'));
    let el: HTMLElement = de.nativeElement;
    expect(el.hidden).toBe(false);
    expect(component.formValidation.message).toBe(true);
  }));

  it('should render invalid name message when adding a comment with invalid name', async(() => {
    let service = TestBed.get(InternApiService);
    spyOn(service, 'addComment').and.returnValue(Observable.throw({ json: () => {
      return [{ code: 6 }];
    }}));

    component.onCommentSubmit();
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.name-danger'));
    let el: HTMLElement = de.nativeElement;
    expect(el.hidden).toBe(false);
    expect(component.formValidation.name).toBe(true);
  }));

  it('should render all invalid fields messages when adding a comment with empty fields', async(() => {
    let service = TestBed.get(InternApiService);
    spyOn(service, 'addComment').and.returnValue(Observable.throw({ json: () => {
      return [{ code: 6 }, { code: 5 }];
    }}));

    component.onCommentSubmit();
    fixture.detectChanges();

    let deMessage = fixture.debugElement.query(By.css('.message-danger'));
    let elMessage: HTMLElement = deMessage.nativeElement;
    let deName = fixture.debugElement.query(By.css('.name-danger'));
    let elName: HTMLElement = deName.nativeElement;
    expect(elMessage.hidden).toBe(false);
    expect(elName.hidden).toBe(false);
    expect(component.formValidation.message).toBe(true);
    expect(component.formValidation.name).toBe(true);
  }));
});
