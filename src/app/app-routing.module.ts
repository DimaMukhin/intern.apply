import { AddJobComponent } from './add-job/add-job.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SurveyComponent } from './survey/survey.component';
import { JobListComponent } from './job-list/job-list.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ViewJobComponent } from "./view-job/view-job.component";
import { QuestionListComponent } from './question-list/question-list.component';
import { ViewQuestionComponent } from './view-question/view-question.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'addjob', component: AddJobComponent },
    { path: 'jobs', component: JobListComponent },
    { path: 'contact', component: ContactUsComponent },
    { path: 'search/:searchText', component: JobListComponent },
    { path: 'search', component: HomeComponent },
    { path: 'job/:id', component: ViewJobComponent },
    { path: 'questions', component: QuestionListComponent },
    { path: 'questions/:id', component: ViewQuestionComponent },
    { path: 'survey', component: SurveyComponent },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}