import { Observable } from 'rxjs';
import { InternApiService } from './../shared/services/intern-api/intern-api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AddJobComponent } from './add-job.component';

describe('AddJobComponent', () => {
  let component: AddJobComponent;
  let fixture: ComponentFixture<AddJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpModule
      ],
      declarations: [AddJobComponent],
      providers: [InternApiService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show success message on valid job sent', () => {
    let service = TestBed.get(InternApiService);
    spyOn(service, 'addJob').and.returnValue(Observable.of(true));

    component.addJob();
    fixture.detectChanges();


    let de = fixture.debugElement.query(By.css('.alert-success'));
    let el: HTMLElement = de.nativeElement;
    expect(el.hidden).toBe(false);
  });

  it('should show error message when adding invalid job', () => {
    let service = TestBed.get(InternApiService);
    spyOn(service, 'addJob').and.returnValue(Observable.throw([false]));

    component.addJob();
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.alert-danger'));
    let el: HTMLElement = de.nativeElement;
    expect(el.hidden).toBe(false);
  });

  it('should get an error for organization when adding a job with invalid organization', () => {
    let service = TestBed.get(InternApiService);
    spyOn(service, 'addJob').and.returnValue(Observable.throw({
      json: () => {
        return [{ code: 11 }];
      }
    }));

    component.addJob();
    fixture.detectChanges();

    expect(component.errors.organization).toBeTruthy();

  });

  it('should get an error for title when adding a job with invalid title', () => {
    let service = TestBed.get(InternApiService);
    spyOn(service, 'addJob').and.returnValue(Observable.throw({
      json: () => {
        return [{ code: 12 }];
      }
    }));

    component.addJob();
    fixture.detectChanges();

    expect(component.errors.title).toBeTruthy();

  });

  it('should get an error for location when adding a job with invalid location', () => {
    let service = TestBed.get(InternApiService);
    spyOn(service, 'addJob').and.returnValue(Observable.throw({
      json: () => {
        return [{ code: 13 }];
      }
    }));

    component.addJob();
    fixture.detectChanges();

    expect(component.errors.location).toBeTruthy();

  });

  it('should get an error for description when adding a job with invalid description', () => {
    let service = TestBed.get(InternApiService);
    spyOn(service, 'addJob').and.returnValue(Observable.throw({
      json: () => {
        return [{ code: 14 }];
      }
    }));

    component.addJob();
    fixture.detectChanges();

    expect(component.errors.description).toBeTruthy();
  });

  it('should get all errors if every form field is invalid', () => {
    let service = TestBed.get(InternApiService);
    spyOn(service, 'addJob').and.returnValue(Observable.throw({
      json: () => {
        return [{ code: 11 }, { code: 12 }, { code: 13 }, { code: 14 }];
      }
    }));

    component.addJob();
    fixture.detectChanges();

    expect(component.errors.organization).toBeTruthy();
    expect(component.errors.title).toBeTruthy();
    expect(component.errors.location).toBeTruthy();
    expect(component.errors.description).toBeTruthy();
  });



});
