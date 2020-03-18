import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['Male', 'Female'];
  userDetails: FormGroup;
  forbiddenName = ['Alex', 'Anna'];

  ngOnInit(): void {
    /*
    this.userDetails = new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      gender: new FormControl('Male')
    });
    */

   // form group
    this.userDetails = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      gender: new FormControl('Male'),
      hobbies: new FormArray([])
    });

    this.userDetails.statusChanges
    .subscribe(status => console.log(status));
  }

  get hobbies() {
    return this.userDetails.get('hobbies') as FormArray;
  }

  onSubmit() {
    console.log(this.userDetails);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    this.hobbies.push(control);
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if  (this.forbiddenName.indexOf(control.value) !== -1) {
      return {isForbiddenName: true};
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Observable<any> | Promise<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        console.log(control.value);
        if (control.value === 'abc@gmail.com') {
          console.log('Inside if');
          resolve({isForbiddenEmail: true});
        } else {
          console.log('Inside else');
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
