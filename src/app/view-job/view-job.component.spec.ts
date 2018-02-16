import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { ViewJobComponent } from './view-job.component';
import { JobCommentsComponent } from './job-comments/job-comments.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { InternApiService } from '../shared/services/intern-api/intern-api.service';

describe('ViewJobComponent', () => {
    let component: ViewJobComponent;
    let fixture: ComponentFixture<ViewJobComponent>;
    let service: InternApiService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule, RouterTestingModule, ReactiveFormsModule],
            declarations: [ViewJobComponent, JobCommentsComponent, AddCommentComponent],
            providers: [InternApiService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ViewJobComponent);
        component = fixture.componentInstance;
        service = TestBed.get(InternApiService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the job description if the job exists', async(() => {
        spyOn(service, 'getJob').and.returnValue(Observable.of([{
            id: 1,
            organization: 'Microsoft',
            title: 'Co-op Developer',
            location: 'Winnipeg, MB',
            description: 'good position'
        }]));

        component.getJob(0);
        fixture.detectChanges();

        let deOrganization = fixture.debugElement.query(By.css('.view-organization'));
        let elOrganization: HTMLElement = deOrganization.nativeElement;
        let deTitle = fixture.debugElement.query(By.css('.view-title'));
        let elTitle: HTMLElement = deTitle.nativeElement;
        let deLocation = fixture.debugElement.query(By.css('.view-location'));
        let elLocation: HTMLElement = deLocation.nativeElement;
        let deDescription = fixture.debugElement.query(By.css('.view-description'));
        let elDescription: HTMLElement = deDescription.nativeElement;

        expect(component.valid).toBe(true);
        expect(elOrganization.innerText).toBe('Microsoft');
        expect(elTitle.innerText).toBe('Co-op Developer');
        expect(elLocation.innerText).toBe('Winnipeg, MB');
        expect(elDescription.innerText).toBe('good position');
    }));

    it('should display invalid job message on invalid job id', async(() => {
        spyOn(service, 'getJob').and.returnValue(Observable.throw({}));

        component.getJob(undefined);
        fixture.detectChanges();

        let de = fixture.debugElement.query(By.css('.view-response'));
        let el: HTMLElement = de.nativeElement;

        expect(component.valid).toBe(false);
        expect(component.job).toEqual({});
        expect(component.response).toBe('job id is not valid');
        expect(el.innerText).toBe('job id is not valid');
    }));

    it('should display no job message on empty job request', async(() => {
        spyOn(service, 'getJob').and.returnValue(Observable.of([]));

        component.getJob(undefined);
        fixture.detectChanges();

        let de = fixture.debugElement.query(By.css('.view-response'));
        let el: HTMLElement = de.nativeElement;

        expect(component.valid).toBe(false);
        expect(component.job).toBe(undefined);
        expect(component.response).toBe('No such job');
        expect(el.innerText).toBe('No such job');
    }));
});