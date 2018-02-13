import { Component, OnInit, Input } from '@angular/core';
import { InternApiService } from '../../shared/services/intern-api/intern-api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  @Input()
  jobID: number;

  commentSent: boolean;
  addCommentForm: FormGroup;
  formValidation: any = {};

  constructor(private internApi: InternApiService) { }

  ngOnInit() {
    this.addCommentForm = new FormGroup({
      'name': new FormControl(null),
      'messageBody': new FormControl(null)
    });
  }

  /**
   * On comment submit, send the comment to the server
   * On error, display error message
   * On success, display success message
   */
  public onCommentSubmit(): void {

    this.commentSent = undefined;

    this.formValidation = {};
    this.internApi.addComment(
      this.jobID, 
      this.addCommentForm.value.messageBody, 
      this.addCommentForm.value.name)
      .subscribe((response) => {
        this.setCommentStatus(true);
      }, (error) => {
        if (error.json) {
          error = error.json();
          if (error.length) {
            for (let err of error) {
              if (err.code == 0) this.setCommentStatus(false);
              else if (err.code == 5) this.formValidation.message = true;
              else if (err.code == 6) this.formValidation.name = true;
            }
          } else
            this.setCommentStatus(false);
        } else
          this.setCommentStatus(false);
      });
  }

  /**
   * set "message sent" status for display
   * @param flag true if message was sent successfuly, falst otherwise
   */
  setCommentStatus(flag: boolean): void {
    this.commentSent = flag;
    setTimeout(() => {
      this.commentSent = undefined;
    }, 3000);
  }

}
