import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {JobRatingComponent} from './job-rating.component';
import {InternApiService} from '../../shared/services/intern-api/intern-api.service';

import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RatingModule} from 'ngx-bootstrap/rating';
import {Observable} from 'rxjs/Observable';
import {By} from '@angular/platform-browser';

describe('JobRatingComponent', () => {
    let component: JobRatingComponent;
    let fixture: ComponentFixture<JobRatingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FormsModule, HttpModule, RatingModule],
            declarations: [JobRatingComponent],
            providers: [InternApiService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JobRatingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get a job rating', async(() => {
        const service = TestBed.get(InternApiService);

        spyOn(service, 'getJobRating').and.returnValue(Observable.of([{
            jobID: 1, score: '5.00', votes: 1
        }]));

        component.jobID = 1;
        component.getRating();
        fixture.detectChanges();

        expect(component.score).toBe(5);
        expect(component.votes).toBe(1);
    }));
});
