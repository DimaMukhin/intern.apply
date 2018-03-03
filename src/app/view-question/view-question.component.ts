import { Component, OnInit } from '@angular/core';
import { InternApiService } from '../shared/services/intern-api/intern-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.css']
})
export class ViewQuestionComponent implements OnInit {

  question: any;

  constructor(private internApi: InternApiService, private route: ActivatedRoute) { 
    this.route.params.subscribe(params => {
      this.getQuestion(params.id);
    });
  }

  ngOnInit() {
  }

  /**
   * Get the question from internAPI by the question id
   * @param id the id of the question
   */
  public getQuestion(id: number): void {
    this.internApi.getQuestionById(id).subscribe((data) => {
      this.question = data;
    }, (err) => {
      this.question = {};
    });
  }

}
