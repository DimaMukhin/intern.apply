import {Component, OnInit} from '@angular/core';
import { InternApiService } from '../shared/services/intern-api/intern-api.service';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    user: object;    // user object
    isSubmitted: boolean; // the status of the form submission
    response: string;    // the response we get once the form is submitted

    constructor(private internAPI: InternApiService) {
    }

    /*
     * initialization of properties
     */
    ngOnInit() {
        this.user = {
            username: undefined,
            password: undefined,
            passwordConfirm: undefined,
            email: undefined,
            emailConfirm: undefined
        };
        this.isSubmitted = false;
    }

   /*
    * when the user submits the form
    */
    onSubmit() {
        this.register();
        this.isSubmitted = true;
    }

    /*
    * creates an API call using the register service
    */
    private register(): void {
        this.internAPI.register(this.user).subscribe((res) => {
            this.response = 'You were successfully registered';
        }, (err) => {
            this.response = 'Something went wrong :(';
        });
    }
}
