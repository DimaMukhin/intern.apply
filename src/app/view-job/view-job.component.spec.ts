import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpModule} from '@angular/http';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';

import {ViewJobComponent} from './view-job.component';
import {InternApiService} from '../shared/services/intern-api/intern-api.service';
import {Observable} from 'rxjs';
import {de} from "ngx-bootstrap";

describe('ViewJobComponent', () => {
    let component: ViewJobComponent;
    let fixture: ComponentFixture<ViewJobComponent>;
    let service: InternApiService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule, RouterTestingModule],
            declarations: [ViewJobComponent],
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
            locaction: 'Winnipeg, MB',
            description: 'good position'
        }]));

        fixture.detectChanges();

        let deOrganization = fixture.debugElement.query(By.css('.view_organization'));
        let elOrganization: HTMLElement = deOrganization.nativeElement;
        let deTitle = fixture.debugElement.query(By.css('.view_title'));
        let elTitle: HTMLElement = deTitle.nativeElement;
        let deLocation = fixture.debugElement.query(By.css('.view_location'));
        let elLocation: HTMLElement = deLocation.nativeElement;
        let deDescription = fixture.debugElement.query(By.css('.view_description'));
        let elDescription: HTMLElement = deDescription.nativeElement;

        expect(elOrganization.innerText).toBe('Microsoft');
        expect(elTitle.innerText).toBe('Co-op Developer');
        expect(elLocation.innerText).toBe('Winnipeg, MB');
        expect(elDescription.innerText).toBe('good position');
    }));

    // it('should get a job from a server by id', async(() => {
    //   spyOn(service, 'getJob').and.callFake((param) => {
    //     param.returnValue(Observable.from([[{
    //         id: 'test id',
    //         organization: 'test organization',
    //         title: 'test title',
    //         location: 'test location',
    //         description: 'test description'
    //     }]]));
    //   });
    //
    //   fixture.detectChanges();
    //
    //   //expect(component.job).toBeDefined();
    //   expect(component.job.id).toBe('test id');
    //   expect(component.job.organization).toBe('test organization');
    //   expect(component.job.title).toBe('test title');
    //   expect(component.job.location).toBe('test location');
    //   expect(component.job.description).toBe('test description');
    // }));
});
