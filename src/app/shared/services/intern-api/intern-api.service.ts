import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

const BASE_URL = 'http://localhost:3000';

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

}
