import { Component, OnInit } from '@angular/core';
import { InternApiService } from '../shared/services/intern-api/intern-api.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})

export class JobListComponent implements OnInit {
  jobs: any[];
  jobsPerPage:number = 10;

  constructor(private internAPI: InternApiService) { }

  ngOnInit() {
    this.jobs = [];
    this.getAllJobs();
  }

  /**
   * get all the jobs from internAPI for display
   */
  private getAllJobs(): void {
    this.internAPI.getAllJobs().subscribe((data) => {
      this.jobs = data;
    }, (error) => {
      this.jobs = [];
    });
  }
}