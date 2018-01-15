import { Component, OnInit } from '@angular/core';
import { InternApiService } from '../shared/services/intern-api/intern-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  jobs: any[];

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
