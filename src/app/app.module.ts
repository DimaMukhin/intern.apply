import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RatingModule } from 'ngx-bootstrap/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InternApiService } from './shared/services/intern-api/intern-api.service';
import { SurveyComponent } from './survey/survey.component';
import { AddJobComponent } from './add-job/add-job.component';
import { JobListComponent } from './job-list/job-list.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FooterComponent } from './footer/footer.component';
import { ViewJobComponent } from './view-job/view-job.component';
import { RouterLinkStubDirective } from './shared/directives/router-link-stub.directive';
import { AddCommentComponent } from './view-job/add-comment/add-comment.component';
import { JobCommentsComponent } from './view-job/job-comments/job-comments.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { AddSalaryComponent } from './view-job/add-salary/add-salary.component';
import { ViewQuestionComponent } from './view-question/view-question.component';
import { JobRatingComponent } from './view-job/job-rating/job-rating.component';
import { AddAnswerComponent } from './view-question/add-answer/add-answer.component';
import { ViewAnswersComponent } from './view-question/view-answers/view-answers.component';
import { TipsComponent } from './tips/tips.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PageNotFoundComponent,
    SurveyComponent,
    AddJobComponent,
    JobListComponent,
    ContactUsComponent,
    FooterComponent,
    PageNotFoundComponent,
    ViewJobComponent,
    RouterLinkStubDirective,
    AddCommentComponent,
    JobCommentsComponent,
    QuestionListComponent,
    AddSalaryComponent,
    ViewQuestionComponent,
    JobRatingComponent,
    AddAnswerComponent,
    ViewAnswersComponent,
    TipsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    RatingModule.forRoot(),
    NgbModule.forRoot(),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    InternApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
