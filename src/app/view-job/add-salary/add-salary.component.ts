import { Component, OnInit, Input, NgModule } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModalModule, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

import { InternApiService } from '../../shared/services/intern-api/intern-api.service';

@Component({
  selector: 'app-add-salary',
  templateUrl: './add-salary.component.html',
  styleUrls: ['./add-salary.component.css']
})

export class AddSalaryComponent implements OnInit {

  @Input()
  jobID: number;
  @Input()
  numSalary: number;
  @Input()
  jobSalary: number;

  salarySent: boolean;
  addSalaryForm: FormGroup;
  popup: NgbModalRef;
  formValidation: any = {};

  constructor(public modalService: NgbModal, private internApi: InternApiService) { }

  ngOnInit() {
    this.addSalaryForm = new FormGroup({
      'salary': new FormControl(null),
      'stype': new FormControl(null)
    });
  }

  open(content) {
    this.popup = this.modalService.open(content);
  }
  

  /**
 * On comment submit, send the comment to the server
 * On error, display error message
 * On success, display success message
 */
  public onSalarySubmit(): void {

    this.salarySent = undefined;
    this.formValidation = {};

    this.internApi.addSalary(
      this.jobID,
      this.addSalaryForm.value.salary,
      this.addSalaryForm.value.stype)
      .subscribe((response) => {
        this.setSalaryStatus(true);
        this.jobSalary = response.salary;
        this.numSalary = response.salaryType;
        this.popup.close();
      }, (error) => {
        if (error.json) {
          error = error.json();
          if (error.length) {
            for (let err of error) {
              if (err.code == 0) this.setSalaryStatus(false);
              else if (err.code == 41) this.formValidation.salary = true;
              else if (err.code == 42) this.formValidation.stype = true;
            }
          } else
            this.setSalaryStatus(false);
        } else
          this.setSalaryStatus(false);
      });
  }

  /**
   * set "message sent" status for display
   * @param flag true if message was sent successfuly, false otherwise
   */
  setSalaryStatus(flag: boolean): void {
    this.salarySent = flag;
    setTimeout(() => {
      this.salarySent = undefined;
    }, 3000);
  }

}
