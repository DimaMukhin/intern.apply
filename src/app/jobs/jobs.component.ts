import { Component,Input, OnInit } from '@angular/core';
import { InternApiService } from '../shared/services/intern-api/intern-api.service';
import { ActivatedRoute } from '@angular/router/';
import { query } from '@angular/core/src/animation/dsl';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  filteredJobs=[];
  searchText: string;
  jobs;
  
  constructor(private service:InternApiService,private route:ActivatedRoute) 
  {

  }

  filterJobs(){
    this.filteredJobs=[];
    for(let job of this.jobs)
    {
     if(job.title.toLowerCase().indexOf(this.searchText.toLowerCase())>-1)
     {
       this.filteredJobs.push(job);
     } 
    }
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params=>{
      this.searchText=params.get('searchText');

      this.service.getAllJobs(this.searchText).subscribe(response=>{
        this.filteredJobs = response;

      });
    
    })
    
    
  }

}
