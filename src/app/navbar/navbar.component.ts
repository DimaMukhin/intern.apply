import { Component, OnInit } from '@angular/core';
import { FilterPipe} from './filter.pipe';
import { FormsModule }   from '@angular/forms';
import { EventEmitter, Output} from '@angular/core';
import { InternApiService } from './../shared/services/intern-api/intern-api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  
})


export class NavbarComponent implements OnInit {

  @Output() notify:EventEmitter<string>=new EventEmitter<string>();

  characters = [
    'Finn the human',
    'Jake the dog',
    'Princess bubblegum',
    'Lumpy Space Princess',
    'Beemo1',
    'Beemo2'
  ]
  jobs;
  jobsTitle;

  onClick(searchText:HTMLInputElement){
    
    this.router.navigate(['/jobs',searchText.value]);
    let jobarray:any[];
  }

  constructor(private service:InternApiService, private router:Router) { 
    
  }

  ngOnInit(){

  }
}