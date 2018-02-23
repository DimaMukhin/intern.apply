import {Component, Input, OnInit} from '@angular/core';
import {InternApiService} from '../../shared/services/intern-api/intern-api.service';

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

    constructor(private internApi: InternApiService) {
    }

    ngOnInit() {
        this.getRating();
    }

    /**
     * getting the rating of a job
     */
    getRating(): void {
        this.internApi.getJobRating(this.jobID)
            .subscribe((rating) => {
                // only display rating when there is one
                if (rating.length > 0) {
                    this.score = rating[0].score;
                    this.votes = rating[0].votes;
                } else {
                    this.noRating();
                }
            }, (error) => {
                this.noRating();
            });
    }

    /**
     * rating a job
     * @param {number} score the score of the new vote
     */
    rate(score: number): void {
        this.internApi.rateJob(this.jobID, score)
            .subscribe((res) => {
                // once submitted a vote, we want to see the most up to do date rating
                this.getRating();
            }, (error) => {
                this.getRating();
            });
    }

    noRating(): void {
        this.score = 0;
        this.votes = 0;
    }
}
