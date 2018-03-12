import {Component, Input, OnInit} from '@angular/core';
import {InternApiService} from '../../shared/services/intern-api/intern-api.service';

@Component({
  selector: 'app-view-answers',
  templateUrl: './view-answers.component.html',
  styleUrls: ['./view-answers.component.css']
})
export class ViewAnswersComponent implements OnInit {

  @Input()
  questionId: number;

  answers: any[];

  constructor(private internApi: InternApiService) {
  }

  ngOnInit() {
    this.getAnswers();
  }

  getAnswers(): void {
    this.answers = [];

    if (!this.questionId) return;

    this.internApi.getAnswers(this.questionId)
      .subscribe((response) => {
        this.answers = response;
      }, (error) => {
        this.answers = [];
      });
  }

}
