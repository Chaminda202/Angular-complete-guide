import { Component, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('form') formDetails: NgForm;
  defaultQuestion = 'pet';
  answer = '';
  genders = ['Male', 'Female'];
  submitted = false;
  userDetails = {
    username: '',
    email: '',
    question: '',
    answer: '',
    gender: ''
  };
  /*
  onSubmit(form: NgForm) {
    console.log(form);
  }
  */

  onSubmit() {
    this.submitted = true;
    console.log(this.formDetails);
    this.userDetails.username = this.formDetails.value.userData.username;
    this.userDetails.email = this.formDetails.value.userData.email;
    this.userDetails.question = this.formDetails.value.secret;
    this.userDetails.answer = this.formDetails.value.questionAnswer;
    this.userDetails.gender = this.formDetails.value.gender;
    this.formDetails.reset();
  }

  onSuggestUsername() {
    const username = 'Michel';
    /*
    this.formDetails.setValue({
      userData: {
        username,
        email: ''
      },
      secret: 'pet',
      questionAnswer: '',
      gender: 'Male'
    });
    */
    this.formDetails.form.patchValue({
      userData: {
        username
      }
    });
  }
}
