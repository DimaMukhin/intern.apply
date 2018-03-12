import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {InternApiService} from '../../shared/services/intern-api/intern-api.service';

@Component({
    selector: 'app-add-answer',
    templateUrl: './add-answer.component.html',
    styleUrls: ['./add-answer.component.css']
})
export class AddAnswerComponent implements OnInit {

    @Input()
    questionId: number;

    answerSent: boolean;
    addAnswerForm: FormGroup;
    formValidation: any = {};

    constructor(private internApi: InternApiService) {
    }

    ngOnInit() {
        this.addAnswerForm = new FormGroup({
            'author': new FormControl(null),
            'body': new FormControl(null)
        });
    }

    /**
     * On answer submit, send the answer to the server
     * On error, display error message
     * On success, display success message
     */
    onAnswerSubmit(): void {
        this.answerSent = undefined;
        this.formValidation = {};

        this.internApi.addAnswer(
            this.questionId,
            this.addAnswerForm.value.body,
            this.addAnswerForm.value.author)
            .subscribe((response) => {
                this.setAnswerStatus(true);
            }, (error) => {
                if (error.json) {
                    error = error.json();
                    if (error.length) {
                        for (const err of error) {
                            if (err.code === 0) this.setAnswerStatus(false);
                            else if (err.code === 34) this.formValidation.body = true;
                            else if (err.code === 33) this.formValidation.author = true;
                        }
                    } else
                        this.setAnswerStatus(false);
                } else
                    this.setAnswerStatus(false);
            });
    }

    /**
     * set "answer sent" status for display
     * @param flag true if answer was sent successfully, false otherwise
     */
    setAnswerStatus(flag: boolean): void {
        this.answerSent = flag;
        setTimeout(() => {
            this.answerSent = undefined;
        }, 3000);
    }

}
