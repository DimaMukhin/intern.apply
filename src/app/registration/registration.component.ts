import {Component, OnInit} from '@angular/core';

// import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    public user = {
        username: '',
        password: '',
        passwordConfirm: '',
        email: '',
        emailConfirm: ''
    };

    constructor() {
    }

    ngOnInit() {
    }

}
