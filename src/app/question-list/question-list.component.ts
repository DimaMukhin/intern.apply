import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { InternApiService } from '../shared/services/intern-api/intern-api.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  questions: any[];

  constructor(private internAPI: InternApiService) { }

  ngOnInit() {
    this.questions = [];
    this.getAllQuestions();
  }

  /**
   * get all the questions from internAPI for display
   */
  private getAllQuestions(): void {
    this.internAPI.getAllQuestions().subscribe((data) => {
      this.questions = data;
    }, (error) => {
      this.questions = [];
    });
  }

}
