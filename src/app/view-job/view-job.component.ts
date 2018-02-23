import { Component, OnInit } from '@angular/core';
import { InternApiService } from '../shared/services/intern-api/intern-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-view-job',
    templateUrl: './view-job.component.html',
    styleUrls: ['./view-job.component.css']
})
export class ViewJobComponent implements OnInit {
    job;
    valid: boolean;
    response: string;

    constructor(private internAPI: InternApiService, private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this.getJob(params.id);
        });
    }

    ngOnInit() {
        this.valid = false;
    }

    getJob(id: number): void {
        this.internAPI.getJob(id).subscribe((data) => {
            if (data.length > 0) {
                this.job = data[0];
                this.valid = true;
            } else {
                this.valid = false;
                this.response = 'No such job';
            }
        }, (err) => {
            this.job = {};
            this.response = 'job id is not valid';
        });
    }
}
