import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { InternApiService } from '../shared/services/intern-api/intern-api.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  readonly defaultVal = 0;

  questions: any[]
  userAnswers: any[]
  messageSent: boolean;

  constructor(private internAPI: InternApiService) { }

  ngOnInit() {
    this.questions = [];
    this.userAnswers = [];
    this.getSurvey();
  }

  private getSurvey(): void {
    this.internAPI.getSurvey().subscribe((data) => {
      this.questions = data;
      this.setSurveyDefault();
    }, (error) => {
      this.questions = [];
    });
  }

  private setSurveyDefault() :void {
    this.questions.forEach(element => {
      this.userAnswers.push(this.defaultVal)
    });
  }

  private onSurveySubmit(): void {
    this.messageSent = undefined;
     this.internAPI.sendSurveyResponses(
       this.userAnswers)
       .subscribe((response) => {
         this.setMessageStatus(true);
       }, (error) => {
         error = error.json();
         console.log(error);
         if (error.length) {
           for (let err of error) {
             if (err.code == 0) this.setMessageStatus(false);
           }
         } else
           this.setMessageStatus(false);
       });
  }

  setMessageStatus(flag: boolean): void {
    this.messageSent = flag;
    setTimeout(() => {
      this.messageSent = undefined;
    }, 3000);
  }
}
