import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { environment } from '../../../../environments/environment';

const BASE_URL = environment.host;

@Injectable()
export class InternApiService {

  constructor(private http: Http) { }

  /**
   * get all the jobs from internAPI
   * @returns Observable holding list of jobs
   */
  public getAllJobs(): Observable<any> {
    return this.http.get(BASE_URL + '/api/job').map((res: Response) => {
      return res.json();
    });
  }

  /**
   * get the survey questions and allowed responses from internAPI
   * @returns Observable holding list of questions with a list of their allowed responses
   */
  public getSurvey(): Observable<any> {
    return this.http.get(BASE_URL + '/api/survey').map((res: Response) => {
      return res.json();
    });
  }

  /**
   * send the survey responses to the server, question responses should be ordered in the same way the questions are in the survey
   * @returns Observable holding list of the answers sent
   */
  public sendSurveyResponses(answers: Array<number>): Observable<any> {
    return this.http.post(BASE_URL + '/api/Survey', { answers }).map((res: Response) => {
      return res.json();
    });
  }

}
