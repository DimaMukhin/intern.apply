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

  constructor(private internApi: InternApiService) { }

  ngOnInit() {
    this.contactMessageForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(25)]),
      'title': new FormControl(null, [Validators.required, Validators.maxLength(25)]),
      'messageBody': new FormControl(null, [Validators.required, Validators.maxLength(300)])
    });
  }

  /**
   * On message submit, send the message to the server
   * On error, display error message
   * On success, display success message
   */
  private onMessageSubmit(): void {
    this.messageSent = undefined;
    this.internApi.sendContactMessage(
      this.contactMessageForm.value.email, 
      this.contactMessageForm.value.title, 
      this.contactMessageForm.value.messageBody)
      .subscribe((response) => {
        this.setMessageStatus(true);
      }, (error) => {
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
