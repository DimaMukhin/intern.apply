import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor() { }

  validateUsername(usernameField: string)  {

    if (usernameField.length < 6) {
      console.log('less than 6');
    }else if (usernameField.length > 20) {
      console.log('more than 20');
    }else {
      console.log('valid');
    }
  }

  ngOnInit() {
  }

}
