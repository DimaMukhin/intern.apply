import {AddJobComponent} from './add-job/add-job.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {JobListComponent} from './job-list/job-list.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {ViewJobComponent} from "./view-job/view-job.component";

const routes: Routes = [

    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'addjob', component: AddJobComponent},
    {path: 'jobs', component: JobListComponent},
    {path: 'contact', component: ContactUsComponent},
    { path: 'search/:searchText', component: JobListComponent },
    {path: 'job/:id', component: ViewJobComponent},
    {path: '**', component: PageNotFoundComponent},

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
