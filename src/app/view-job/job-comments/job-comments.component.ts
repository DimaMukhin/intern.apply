import { Component, OnInit, Input } from '@angular/core';

import { InternApiService } from '../../shared/services/intern-api/intern-api.service';

@Component({
  selector: 'app-job-comments',
  templateUrl: './job-comments.component.html',
  styleUrls: ['./job-comments.component.css']
})
export class JobCommentsComponent implements OnInit {

  @Input()
  jobID: number;

  comments: any[];

  constructor(private internApi: InternApiService) { }

  ngOnInit() {
    this.getAllComments();
  }

  /**
   * get all comments for the job from the server for display
   */
  public getAllComments(): void {
    this.comments = [];

    if (!this.jobID) return;

    this.internApi.getAllCommentsOfJob(this.jobID)
      .subscribe((response) => {
        this.comments = response;
      }, (error) => {
        this.comments = [];
      });
  }

}
