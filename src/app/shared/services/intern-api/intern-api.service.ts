import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { environment } from '../../../../environments/environment';
import { Job } from '../../models/job.model';

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
   * get a specific job from the db
   * @returns Observable holding job details
   */
  public getJob(id: number): Observable<any> {
    return this.http.get(BASE_URL + '/api/job/' + id).map((res: Response) => {
      return res.json();
    });
  }

  /**
   * add job to the database
   * @param job job to be added to the database
   */
  public addJob(job: Job) {
    return this.http.post(BASE_URL + '/api/job', job).map((res: Response) => {
      return res.json();
    });
  }

  /**
   * post a new "contact-us" message
   * @param email email of the message sender
   * @param title title of the message
   * @param message message body
   */
  public sendContactMessage(email: string, title: string, message: string): Observable<any> {
    return this.http.post(BASE_URL + '/api/contactMessage', { email, title, message }).map((res: Response) => {
      return res.json();
    });
  }

  /**
   * post a new comment to a job
   * @param jobID   the id of the job to send the comment to
   * @param message the body of the comment
   * @param author  the name of the author
   */
  public addComment(jobID: number, message: string, author: string): Observable<any> {
    return this.http.post(BASE_URL + '/api/comment', { jobID, message, author }).map((res: Response) => {
      return res.json();
    });
  }

  /**
   * get all the comments posted for a job
   * @param jobID the id of the job
   */
  public getAllCommentsOfJob(jobID: number): Observable<any> {
    return this.http.get(BASE_URL + `/api/job/${jobID}/comments`).map((res: Response) => {
      return res.json();
    });
  }

  /**
   * get all the Q&A questions from internAPI
   * @returns Observable holding list of questions
   */
  public getAllQuestions(): Observable<any> {
    return this.http.get(BASE_URL + '/api/question').map((res: Response) => {
      return res.json();
    });
  }
}