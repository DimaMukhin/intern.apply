import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { ContactUsComponent } from './contact-us.component';
import { InternApiService } from '../shared/services/intern-api/intern-api.service';

describe('ContactUsComponent', () => {
  let component: ContactUsComponent;
  let fixture: ComponentFixture<ContactUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpModule],
      declarations: [ ContactUsComponent ],
      providers: [InternApiService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render message sent on valid message sent', async(() => {
    let service = TestBed.get(InternApiService);
    spyOn(service, 'sendContactMessage').and.returnValue(Observable.of(true));

    component.onMessageSubmit();
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.text-success'));
    let el: HTMLElement = de.nativeElement;
    expect(el.hidden).toBe(false);
  }));

  it('should render server error message on unknown server error when sending message', async(() => {
    let service = TestBed.get(InternApiService);
    spyOn(service, 'sendContactMessage').and.returnValue(Observable.throw([false]));

    component.onMessageSubmit();
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.text-warning'));
    let el: HTMLElement = de.nativeElement;
    expect(el.hidden).toBe(false);
  }));

  it('should render invalid email message when sending a message with invalid email', async(() => {
    let service = TestBed.get(InternApiService);
    spyOn(service, 'sendContactMessage').and.returnValue(Observable.throw({ json: () => {
      return [{ code: 1 }];
    }}));

    component.onMessageSubmit();
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.email-danger'));
    let el: HTMLElement = de.nativeElement;
    expect(el.hidden).toBe(false);
  }));

  it('should render invalid title message when sending a message with invalid title', async(() => {
    let service = TestBed.get(InternApiService);
    spyOn(service, 'sendContactMessage').and.returnValue(Observable.throw({ json: () => {
      return [{ code: 2 }];
    }}));

    component.onMessageSubmit();
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.title-danger'));
    let el: HTMLElement = de.nativeElement;
    expect(el.hidden).toBe(false);
  }));

  it('should render invalid message body message when sending a message with invalid body', async(() => {
    let service = TestBed.get(InternApiService);
    spyOn(service, 'sendContactMessage').and.returnValue(Observable.throw({ json: () => {
      return [{ code: 3 }];
    }}));

    component.onMessageSubmit();
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.message-danger'));
    let el: HTMLElement = de.nativeElement;
    expect(el.hidden).toBe(false);
  }));

  it('should render all invalid fields messages when sending a complete invalid message', async(() => {
    let service = TestBed.get(InternApiService);
    spyOn(service, 'sendContactMessage').and.returnValue(Observable.throw({ json: () => {
      return [{ code: 1 }, { code: 2 }, { code: 3 }];
    }}));

    component.onMessageSubmit();
    fixture.detectChanges();

    let de1 = fixture.debugElement.query(By.css('.email-danger'));
    let el1: HTMLElement = de1.nativeElement;
    let de2 = fixture.debugElement.query(By.css('.title-danger'));
    let el2: HTMLElement = de2.nativeElement;
    let de3 = fixture.debugElement.query(By.css('.message-danger'));
    let el3: HTMLElement = de3.nativeElement;
    expect(el1.hidden).toBe(false);
    expect(el2.hidden).toBe(false);
    expect(el3.hidden).toBe(false);
  }));
});