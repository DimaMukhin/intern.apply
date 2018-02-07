import { AddJobComponent } from './add-job/add-job.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
<<<<<<< HEAD
import { JobsComponent } from './jobs/jobs.component';
=======
import { JobListComponent } from './job-list/job-list.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
>>>>>>> 85ade48e87639e88e101ef3798709f1a874eb5ca

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
<<<<<<< HEAD
  { path: 'jobs/:searchText', component: JobsComponent },
=======
  { path: 'addjob', component: AddJobComponent },
  { path: 'jobs', component: JobListComponent },
  { path: 'contact', component: ContactUsComponent },
>>>>>>> 85ade48e87639e88e101ef3798709f1a874eb5ca
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
