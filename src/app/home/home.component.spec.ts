import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs';

import { HomeComponent } from './home.component';
import { InternApiService } from '../shared/services/intern-api/intern-api.service';
import { JobListComponent } from '../job-list/job-list.component';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router/';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const fakeActivatedRoute = {
    snapshot: { data: { } }
  } as ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, RouterModule],
      declarations: [HomeComponent, JobListComponent],
      providers: [InternApiService, {provide: ActivatedRoute, useValue: fakeActivatedRoute}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
