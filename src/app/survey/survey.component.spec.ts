import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { SurveyComponent } from './survey.component';
import { InternApiService } from '../shared/services/intern-api/intern-api.service';

describe('SurveyComponent', () => {
  let component: SurveyComponent;
  let fixture: ComponentFixture<SurveyComponent>;
  let service: InternApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        FormsModule,
        HttpModule ],
      declarations: [ SurveyComponent ],
      providers: [InternApiService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyComponent);
    component = fixture.componentInstance;
    service = TestBed.get(InternApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show success message on valid survey sent', () => {
    spyOn(service, 'sendSurveyResponses').and.returnValue(Observable.of(true));

    component.onSurveySubmit();
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.text-success'));
    let el: HTMLElement = de.nativeElement;
    expect(el.hidden).toBe(false);
  });

  it('should render server error message on unknown server error when sending survey', async(() => {
    spyOn(service, 'sendSurveyResponses').and.returnValue(Observable.throw({ json: () => {
      return [{ code: 0 }];
    }}));

    component.onSurveySubmit();
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.text-warning'));
    let el: HTMLElement = de.nativeElement;
    expect(el.hidden).toBe(false);
  }));

  it('should show invalid survey error when sending an incomplete survey', async(() => {
    spyOn(service, 'sendSurveyResponses').and.returnValue(Observable.throw({ json: () => {
      return [{ code: 51 }];
    }}));

    component.onSurveySubmit();
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.survey-danger'));
    let el: HTMLElement = de.nativeElement;
    expect(el.hidden).toBe(false);
  }));
});
