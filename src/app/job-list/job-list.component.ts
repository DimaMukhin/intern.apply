import { Component, OnInit } from '@angular/core';
import { InternApiService } from '../shared/services/intern-api/intern-api.service';
import { ActivatedRoute } from '@angular/router/';
import { query } from '@angular/core/src/animation/dsl';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})

export class JobListComponent implements OnInit {
  jobs: any[];
  filteredJobs: any[];

  searchText: string;

  constructor(private internAPI: InternApiService, private route: ActivatedRoute) { }


  /**
   * get all the jobs from internAPI for display
   */
  private getAllJobs(): void {
    this.internAPI.getAllJobs(this.searchText).subscribe((data) => {
      this.jobs = data;
      this.filteredJobs = data;

      if (this.searchText != null) {
        this.jobs = this.filteredJobs;
      }
    }, (error) => {
      this.jobs = [];
    });
  }

  filterJobs(searchText) {
    this.internAPI.getAllJobs(searchText).subscribe(
      response => {
        this.jobs = response;
      });

  }

  ngOnInit() {

    this.jobs = [];
    this.filteredJobs = [];

    this.route.paramMap.subscribe(
      params => {
        let searchText = params.get('searchText');
        if (searchText) {
          this.filterJobs(searchText);
        }
        else {
          this.getAllJobs();
        }
      });

  }


}
