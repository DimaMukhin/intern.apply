import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { InternApiService } from '../shared/services/intern-api/intern-api.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  questions: any[];
  showQuestionForm: boolean;
  questionSent: boolean;
  addQuestionForm: FormGroup;
  formValidation: any = {};

  constructor(private internApi: InternApiService) { }

  ngOnInit() {
    this.addQuestionForm = new FormGroup({
      'name': new FormControl(null),
      'title': new FormControl(null),
      'questionBody': new FormControl(null)
    });

    this.questions = [];
    this.showQuestionForm = false;
    this.getAllQuestions();
  }

  /**
   * get all the questions from internAPI for display
   */
  private getAllQuestions(): void {
    this.internApi.getAllQuestions().subscribe((data) => {
      this.questions = data;
    }, (error) => {
      this.questions = [];
    });
  }

  /**
   * On question submit, send the question to the server
   * On error, display error message
   * On success, display success message
   */
  public onQuestionSubmit(): void {

    this.questionSent = undefined;

    this.formValidation = {};
    this.internApi.addQuestion( 
      this.addQuestionForm.value.title,
      this.addQuestionForm.value.questionBody, 
      this.addQuestionForm.value.name)
      .subscribe((response) => {
        this.setQuestionStatus(true);
        this.getAllQuestions();
      }, (error) => {
        if (error.json) {
          error = error.json();
          if (error.length) {
            for (let err of error) {
              if (err.code == 0) this.setQuestionStatus(false);
              else if (err.code == 7) this.formValidation.title = true;
              else if (err.code == 8) this.formValidation.question = true;
              else if (err.code == 9) this.formValidation.name = true;
            }
          } else
            this.setQuestionStatus(false);
        } else
          this.setQuestionStatus(false);
      });
  }

  /**
   * set "question sent" status for display
   * @param flag true if question was sent successfuly, false otherwise
   */
  public setQuestionStatus(flag: boolean): void {
    this.questionSent = flag;
    setTimeout(() => {
      this.questionSent = undefined;
    }, 3000);
  }

  public onAskButtonClick(): void {
    this.showQuestionForm = !this.showQuestionForm;
  }

}
