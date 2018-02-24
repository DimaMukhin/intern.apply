import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { InternApiService } from '../shared/services/intern-api/intern-api.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  readonly defaultVal = -1;

  questions: any[]
  userAnswers: any[]
  messageSent: boolean;
  formValidation: any = {};

  constructor(private internAPI: InternApiService) { }

  ngOnInit() {
    this.questions = [];
    this.getSurvey();
  }

  /**
   * Get all the survey questions and allowed responses from the server, and set the user answers to default(unselected)
   */
  private getSurvey(): void {
    this.internAPI.getSurvey().subscribe((data) => {
      this.questions = data;
      this.setSurveyDefault();
    }, (error) => {
      this.questions = [];
    });
  }

  /**
   * Set the user answers to default value for each question in the survey, used to check non selection
   */
  private setSurveyDefault(): void {
    this.userAnswers = [];
    this.questions.forEach(element => {
      this.userAnswers.push(this.defaultVal)
    });
  }

  /**
   * On message submit, send the survey to the server and get error or success
   * On error, display error message
   * On success, display success message
   */
  public onSurveySubmit(): void {
    this.formValidation = {};
    this.messageSent = undefined;
    this.internAPI.sendSurveyResponses(
      this.userAnswers)
      .subscribe((response) => {
        this.setMessageStatus(true);
      }, (error) => {
        if (error.json) {
          error = error.json();
          if (error.length) {
            for (let err of error) {
              if (err.code == 0) this.setMessageStatus(false);
              if (err.code == 41) this.formValidation.missing = true;
            }
          } else
            this.setMessageStatus(false);
        } else
          this.setMessageStatus(false);
      });
  }

  /**
   * set "message sent" status for display
   * @param flag true if message was sent successfuly, falst otherwise
   */
  setMessageStatus(flag: boolean): void {
    this.messageSent = flag;
    setTimeout(() => {
      this.messageSent = undefined;
    }, 3000);
  }
}
