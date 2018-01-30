import {Component, OnInit} from '@angular/core';
import {RegisterApiService} from '../shared/services/register-api/register-api.service';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    public user: object;    // user object
    public isSubmitted: boolean; // the status of the form submission
    public response: string;    // the response we get once the form is submitted

    constructor(private registerAPI: RegisterApiService) {
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
        this.registerAPI.register(this.user).subscribe((res) => {
            this.response = 'You were successfully registered';
        }, (err) => {
            this.response = 'Something went wrong :(';
        });
    }
}
