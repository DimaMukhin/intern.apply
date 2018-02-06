import { Component, OnInit } from '@angular/core';
import { InternApiService } from '../shared/services/intern-api/intern-api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  messageSent: boolean;
  contactMessageForm: FormGroup;
  formValidation: any = {};

  constructor(private internApi: InternApiService) { }

  ngOnInit() {
    this.contactMessageForm = new FormGroup({
      'email': new FormControl(null),
      'title': new FormControl(null),
      'messageBody': new FormControl(null)
    });
  }

  /**
   * On message submit, send the message to the server
   * On error, display error message
   * On success, display success message
   */
  public onMessageSubmit(): void {
    this.formValidation = {};
    this.internApi.sendContactMessage(
      this.contactMessageForm.value.email, 
      this.contactMessageForm.value.title, 
      this.contactMessageForm.value.messageBody)
      .subscribe((response) => {
        this.setMessageStatus(true);
      }, (error) => {
        if (error.json) {
          error = error.json();
          if (error.length) {
            for (let err of error) {
              if (err.code == 0) this.setMessageStatus(false);
              if (err.code == 1) this.formValidation.email = true;
              if (err.code == 2) this.formValidation.title = true;
              if (err.code == 3) this.formValidation.message = true;
            }
          } else
            this.setMessageStatus(false);
        } else
          this.setMessageStatus(false);
      });
  }

  /**
   * set "message sent" status for display
   * @param flag true if message was sent successfuly, falst otherwise
   */
  setMessageStatus(flag: boolean): void {
    this.messageSent = flag;
    setTimeout(() => {
      this.messageSent = undefined;
    }, 3000);
  }
}
