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
  let service: InternApiService;

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
    service = TestBed.get(InternApiService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show success message on valid job sent', () => {
    spyOn(service, 'addJob').and.returnValue(Observable.of(true));

    component.addJob();
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.alert-success'));
    let el: HTMLElement = de.nativeElement;
    expect(el.hidden).toBe(false);
  });

  it('should show error message when adding invalid job', () => {
    spyOn(service, 'addJob').and.returnValue(Observable.throw([false]));

    component.addJob();
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.alert-danger'));
    let el: HTMLElement = de.nativeElement;
    expect(el.hidden).toBe(false);
  });

  it('should render invalid organization error message when adding a job with invalid organization', () => {
    spyOn(service, 'addJob').and.returnValue(Observable.throw({
      json: () => {
        return [{ code: 11 }];
      }
    }));

    component.addJob();
    fixture.detectChanges();

    expect(component.errors.organization).toBeTruthy();

    let de = fixture.debugElement.queryAll(By.css('.text-danger'));
    expect(de.length).toBe(1);
  });

  it('should render invalid title error message when adding a job with invalid title', () => {
    spyOn(service, 'addJob').and.returnValue(Observable.throw({
      json: () => {
        return [{ code: 12 }];
      }
    }));

    component.addJob();
    fixture.detectChanges();

    let de = fixture.debugElement.queryAll(By.css('.text-danger'));

    expect(de.length).toBe(1);
    expect(component.errors.title).toBeTruthy();
  });

  it('should render invalid location error message when adding a job with invalid location', () => {
    spyOn(service, 'addJob').and.returnValue(Observable.throw({
      json: () => {
        return [{ code: 13 }];
      }
    }));

    component.addJob();
    fixture.detectChanges();

    let de = fixture.debugElement.queryAll(By.css('.text-danger'));

    expect(de.length).toBe(1);
    expect(component.errors.location).toBeTruthy();
  });

  it('should render invalid description error message when adding a job with invalid description', () => {
    spyOn(service, 'addJob').and.returnValue(Observable.throw({
      json: () => {
        return [{ code: 14 }];
      }
    }));

    component.addJob();
    fixture.detectChanges();

    let de = fixture.debugElement.queryAll(By.css('.text-danger'));

    expect(de.length).toBe(1);
    expect(component.errors.description).toBeTruthy();
  });

  it('should render invalid URL error message when adding a job with invalid URL', () => {
    spyOn(service, 'addJob').and.returnValue(Observable.throw({
      json: () => {
        return [{ code: 15 }];
      }
    }));

    component.addJob();
    fixture.detectChanges();

    let de = fixture.debugElement.queryAll(By.css('.text-danger'));

    expect(de.length).toBe(1);
    expect(component.errors.url).toBeTruthy();
  });

  it('should render all error messages if every form field is invalid', () => {
    spyOn(service, 'addJob').and.returnValue(Observable.throw({
      json: () => {
        return [{ code: 11 }, { code: 12 }, { code: 13 }, { code: 14 }, { code: 15 }];
      }
    }));

    component.addJob();
    fixture.detectChanges();

    let de = fixture.debugElement.queryAll(By.css('.text-danger'));

    expect(de.length).toBe(5);
    expect(component.errors.organization).toBeTruthy();
    expect(component.errors.title).toBeTruthy();
    expect(component.errors.location).toBeTruthy();
    expect(component.errors.description).toBeTruthy();
    expect(component.errors.url).toBeTruthy();
  });
});
