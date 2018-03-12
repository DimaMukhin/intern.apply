import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs';
import {HttpModule} from '@angular/http';

import {ViewAnswersComponent} from './view-answers.component';
import {InternApiService} from '../../shared/services/intern-api/intern-api.service';
import {By} from '@angular/platform-browser';


describe('ViewAnswersComponent', () => {
    let component: ViewAnswersComponent;
    let fixture: ComponentFixture<ViewAnswersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            declarations: [ViewAnswersComponent],
            providers: [InternApiService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ViewAnswersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get all answers for a valid question id', async(() => {
        const service = TestBed.get(InternApiService);
        spyOn(service, 'getAnswers').and.returnValue(Observable.of([
            {author: 'dima', body: 'test'},
            {author: 'ben', body: 'test2'},
            {author: 'cyka', body: 'blyat'}
        ]));

        component.questionId = 1;
        component.getAnswers();
        fixture.detectChanges();

        expect(component.answers.length).toBe(3);
    }));

    it('should not get any answers for an invalid question id', async(() => {
        const service = TestBed.get(InternApiService);
        spyOn(service, 'getAnswers').and.returnValue(Observable.of([
            {author: 'dima', message: 'test'},
            {author: 'ben', message: 'test2'},
            {author: 'cyka', message: 'blyat'}
        ]));

        component.questionId = 0;
        component.getAnswers();
        fixture.detectChanges();

        expect(component.answers.length).toBe(0);
    }));

    it('shoul display all answers for a valid question id', async(() => {
        const service = TestBed.get(InternApiService);
        spyOn(service, 'getAnswers').and.returnValue(Observable.of([
            {author: 'dima', message: 'test'},
            {author: 'ben', message: 'test2'},
            {author: 'cyka', message: 'blyat'}
        ]));

        component.questionId = 1;
        component.getAnswers();
        fixture.detectChanges();

        let deAuthor = fixture.debugElement.queryAll(By.css('.cm-author'));
        let elAuthor1: HTMLElement = deAuthor[0].nativeElement;
        let elAuthor2: HTMLElement = deAuthor[1].nativeElement;
        let elAuthor3: HTMLElement = deAuthor[2].nativeElement;
        let deMessage = fixture.debugElement.queryAll(By.css('.cm-message'));
        let elMessage1: HTMLElement = deMessage[0].nativeElement;
        let elMessage2: HTMLElement = deMessage[1].nativeElement;
        let elMessage3: HTMLElement = deMessage[2].nativeElement;

        expect(deAuthor.length).toBe(3);
        expect(deMessage.length).toBe(3);
        expect(elAuthor1.innerText).toBe('dima');
        expect(elAuthor2.innerText).toBe('ben');
        expect(elAuthor3.innerText).toBe('cyka');
        expect(elMessage1.innerText).toBe('test');
        expect(elMessage2.innerText).toBe('test2');
        expect(elMessage3.innerText).toBe('blyat');
        expect(component.comments.length).toBe(3);
    }));
});
