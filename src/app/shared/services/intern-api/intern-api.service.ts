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
  public getAllJobs(filterText?:string): Observable<any> {
    return this.http.get(BASE_URL + '/api/job',{params:{filter: filterText}}).map((res: Response) => {
      return res.json();
    });
  }

  // public getFilteredJobs(search: string) {
  //   let filter = {
  //     filter: search
  //   };

  //   return this.http.get(BASE_URL + '/api/job', { params: filter }).map((res: Response) => {
  //     return res.json();
  //   });
  // }

}
