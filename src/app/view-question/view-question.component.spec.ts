import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { ViewQuestionComponent } from './view-question.component';
import { InternApiService } from '../shared/services/intern-api/intern-api.service';

describe('ViewQuestionComponent', () => {
  let component: ViewQuestionComponent;
  let fixture: ComponentFixture<ViewQuestionComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
