import { Job } from './../shared/models/job.model';
import { NgForm } from '@angular/forms';
import { InternApiService } from './../shared/services/intern-api/intern-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit {

  constructor(private service: InternApiService) { }

  addJob(form: NgForm) {
    let newJob: Job = form.value;

    this.service.addJob(newJob).subscribe(
      response => {
        console.log("Job added");
      },
      error => {
        console.log(error);
      }
    );

    form.reset();
  }

  ngOnInit() {
  }

}