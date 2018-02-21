import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-job-rating',
  templateUrl: './job-rating.component.html',
  styleUrls: ['./job-rating.component.css']
})
export class JobRatingComponent implements OnInit {

  @Input()
  jobID: number;

  score: number;
  votes: number;

  constructor() { }

  ngOnInit() {
    this.getRating();
  }

  getRating() {
    this.score = 2.4;
    this.votes = 10;
  }

}
