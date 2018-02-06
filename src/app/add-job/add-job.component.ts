import { Job } from './../shared/models/job.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { InternApiService } from './../shared/services/intern-api/intern-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit {

  jobForm: FormGroup;
  errors: any = {};
  jobAdded: boolean = undefined;


  constructor(private service: InternApiService) { }

  ngOnInit() {

    //Setting up the job form 
    this.jobForm = new FormGroup({
      organization: new FormControl(null),
      title: new FormControl(null),
      location: new FormControl(null),
      description: new FormControl(null)
    });

  }

  /**
   * Sends a request to the server to add a new job
   */
  public addJob(): void {
    let newJob: Job = this.jobForm.value;
    this.errors = {};

    this.service.addJob(newJob).subscribe(
      response => {
        this.displayAlert(true);
        this.jobForm.reset();
      },
      error => {
        let serverErrors = error.json();

        if (serverErrors.length > 0) {
          this.handleErrors(serverErrors);
        } else {
          this.displayAlert(false);
        }
      }
    );
  }

  /**
   * Handles all the errors sent by the server
   * @param serverErrors errors sent by the server
   */
  private handleErrors(serverErrors): void {
    this.errors = {};

    for (let err of serverErrors) {
      if (err.code == 0) this.displayAlert(false);
      else if (err.code == 11) this.errors.organization = true;
      else if (err.code == 12) this.errors.title = true;
      else if (err.code == 13) this.errors.location = true;
      else if (err.code == 14) this.errors.description = true;
    }
  }

  /**
   * Displays a success or error alert upon submitting the form 
   * @param flag true to display success message, false to display error
   */
  private displayAlert(flag: boolean): void {
    this.jobAdded = flag;
    setTimeout(() => {
      this.jobAdded = undefined;
    }, 3000);
  }

}