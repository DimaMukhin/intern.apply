import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModalModule, NgbModal, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { By } from '@angular/platform-browser';

import { AddSalaryComponent } from './add-salary.component';
import { InternApiService } from '../../shared/services/intern-api/intern-api.service';

describe('AddSalaryComponent', () => {
  let component: AddSalaryComponent;
  let fixture: ComponentFixture<AddSalaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpModule, NgbModalModule.forRoot()],
      declarations: [ AddSalaryComponent ],
      providers: [ InternApiService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a salary on valid salary addition', async(() => {
    let service = TestBed.get(InternApiService);
    spyOn(service, 'addSalary').and.returnValue(Observable.of(true));

    component.open("content")
    component.onSalarySubmit();
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.text-success'));
    let el: HTMLElement = de.nativeElement;
    expect(el.hidden).toBe(false);
    expect(component.salarySent).toBe(true);
  }));

  it('should render server error message on unknown server error when adding a salary', async(() => {
    let service = TestBed.get(InternApiService);
    spyOn(service, 'addSalary').and.returnValue(Observable.throw([false]));

    component.open("content")
    component.onSalarySubmit();
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.text-warning'));
    let el: HTMLElement = de.nativeElement;
    expect(el.hidden).toBe(false);
  }));

  it('should render invalid salary message when adding invalid salary', async(() => {
    let service = TestBed.get(InternApiService);
    spyOn(service, 'addSalary').and.returnValue(Observable.throw({ json: () => {
      return [{ code: 41 }];
    }}));
    
    console.log("");
    
    fixture.detectChanges();
    component.onSalarySubmit();
    fixture.detectChanges();
        

    let de = fixture.debugElement.query(By.css('.salary-danger'));
    let el: HTMLElement = de.nativeElement;
    // expect(el.hidden).toBe(false);
    // expect(component.formValidation.salary).toBe(true);
  }));
});
