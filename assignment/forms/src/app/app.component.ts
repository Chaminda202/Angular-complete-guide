import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectDetails: FormGroup;
  projectStatus = ['Stable', 'Critical', 'Finished'];

  ngOnInit() {
    this.projectDetails = new FormGroup({
      name: new FormControl(null, [Validators.required, this.projectNameValidator]),
    //  mail: new FormControl(null, [Validators.required, Validators.email], this.emailValidator),
      mail: new FormControl(null, [Validators.required, Validators.email]),
      status: new FormControl(null)
    });
  }

  get name() {
    return this.projectDetails.get('name');
  }

  get mail() {
    return this.projectDetails.get('mail');
  }

  onSubmit() {
    console.log(this.projectDetails);
  }

  projectNameValidator(control: FormControl): {[key: string]: boolean} {
    if (control.value === 'test') {
      return {isInvalidName: true};
    } else {
      return null;
    }
  }

  /*
  emailValidator(control: FormControl): Observable<any> | Promise<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'abc@gmail.com') {
          resolve({isForbiddenEmail: true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
  */
}
