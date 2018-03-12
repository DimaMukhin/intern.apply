import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpModule} from '@angular/http';
import {ReactiveFormsModule} from '@angular/forms';

import {AddAnswerComponent} from './add-answer.component';
import {InternApiService} from '../../shared/services/intern-api/intern-api.service';
import {Observable} from 'rxjs';
import {By} from '@angular/platform-browser';

describe('AddAnswerComponent', () => {
    let component: AddAnswerComponent;
    let fixture: ComponentFixture<AddAnswerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                ReactiveFormsModule
            ],
            declarations: [AddAnswerComponent],
            providers: [InternApiService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddAnswerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render invalid name message when trying to answer with an invalid name', async(() => {
        const service = TestBed.get(InternApiService);
        spyOn(service, 'addAnswer').and.returnValue(Observable.throw({
            json: () => {
                return [{code: 9}];
            }
        }));

        component.questionId = 1;
        component.onAnswerSubmit();
        fixture.detectChanges();

        const de = fixture.debugElement.query(By.css('.author-danger'));
        const el: HTMLElement = de.nativeElement;
        expect(el.hidden).toBe(false);
    }));

    it('should render invalid answer message when trying to answer with an invalid answer', async(() => {
        const service = TestBed.get(InternApiService);
        spyOn(service, 'addAnswer').and.returnValue(Observable.throw({
            json: () => {
                return [{code: 8}];
            }
        }));

        component.questionId = 1;
        component.onAnswerSubmit();
        fixture.detectChanges();

        const de = fixture.debugElement.query(By.css('.body-danger'));
        const el: HTMLElement = de.nativeElement;
        expect(el.hidden).toBe(false);
    }));
});
