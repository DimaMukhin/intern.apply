import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

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

}
