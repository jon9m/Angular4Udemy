import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-form-reactive',
  templateUrl: './form-reactive.component.html',
  styleUrls: ['./form-reactive.component.css']
})
export class FormReactiveComponent implements OnInit {

  genders = ['male', 'female'];
  signupForm: FormGroup;

  forbiddenUserNames = ['chris', 'anna'];

  constructor() { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl('a@a.com', [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      'secret': new FormControl('pet'),
      'hobbies': new FormArray([])
    });

    //reacting to status or value changes
    this.signupForm.valueChanges.subscribe(
      (value) => console.log(value)
    );

    this.signupForm.statusChanges.subscribe(
      (status) => console.log(status)
    );
  }

  addHobbies() {
    const newControl = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(newControl);
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  //Custom validator - ES5 way
  forbiddenNames(control: FormControl): { [key: string]: boolean } {  //Means - reatuns a obj of key value paires (string key, boolean value)
    if ((control.value != null) && ((this.forbiddenUserNames.indexOf(control.value.toLowerCase())) !== -1)) {
      return { nameisforbidden: true };  //Cannot return { nameisforbidden: false } :(
    } else {
      return null;
    }
  }

  //ES6 way
  // forbiddenNames = (control: FormControl): { [key: string]: boolean } => {  //Means - reatuns a obj of key value paires (string key, boolean value)
  //   if ((control.value != null) && ((this.forbiddenUserNames.indexOf(control.value.toLowerCase())) !== -1)) {
  //     return { nameisforbidden: true };  //Cannot return { nameisforbidden: false } :(
  //   } else {
  //     return null;
  //   }
  // }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "xxx@xxx.com") {
          resolve({ 'emailIsForbidden': true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

}
