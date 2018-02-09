import { Component, OnInit } from '@angular/core';
import { InternApiService } from './../shared/services/intern-api/intern-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private service: InternApiService, private router: Router) { }


  onClick(searchText: HTMLInputElement) { this.router.navigate(['/job', searchText.value]); }

  ngOnInit() { }

}
