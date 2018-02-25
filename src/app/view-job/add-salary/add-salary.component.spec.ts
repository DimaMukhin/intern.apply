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
      imports: [ReactiveFormsModule, HttpModule, NgbModalModule.forRoot()],
      declarations: [AddSalaryComponent],
      providers: [InternApiService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.jobID = 0;
    component.jobSalary = 0;
    component.numSalary = 0;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a salary on valid salary addition', async(() => {
    let service = TestBed.get(InternApiService);
    spyOn(service, 'addSalary').and.returnValue(Observable.of({
         jobID: 1, salary: "7", salaryType: 2
    }));

    component.open("content")
    component.onSalarySubmit();
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.text-success'));
    let el: HTMLElement = de.nativeElement;
    expect(el.hidden).toBe(false);
    expect(component.salarySent).toBe(true);

    let de2 = fixture.debugElement.query(By.css('.view-avgSalary'));
    let el2: HTMLElement = de2.nativeElement;
    expect(el2.hidden).toBe(false);
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

    expect(fixture.debugElement.query(By.css('.view-avgSalary'))).toBe(null);
  }));

  it('should render invalid salary message when adding invalid salary', async(() => {
    let service = TestBed.get(InternApiService);
    spyOn(service, 'addSalary').and.returnValue(Observable.throw({
      json: () => {
        return [{ code: 41 }];
      }
    }));

    component.open("content")
    component.onSalarySubmit();
    fixture.detectChanges();

    expect(component.formValidation.salary).toBe(true);
    expect(fixture.debugElement.query(By.css('.view-avgSalary'))).toBe(null);
  }));

  it('should render invalid salaryType message when adding invalid salaryType', async(() => {
    let service = TestBed.get(InternApiService);
    spyOn(service, 'addSalary').and.returnValue(Observable.throw({
      json: () => {
        return [{ code: 42 }];
      }
    }));

    component.open("content")
    fixture.detectChanges();
    component.onSalarySubmit();
    fixture.detectChanges();

    expect(component.formValidation.stype).toBe(true);
    expect(fixture.debugElement.query(By.css('.view-avgSalary'))).toBe(null);
  }));

});
