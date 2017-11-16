import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, ValidatorFn, AbstractControl } from "@angular/forms";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @ViewChild('f') myform: NgForm;
  @ViewChild('ff') fname: NgForm;

  user = {
    userName: '',
    password: '',
    email: '',
    name: ''
  }

  defaultName: string;

  constructor() { }

  ngOnInit() {
    this.defaultName = "default name from ts [ngModal]=value";
    this.forbiddenNameValidator.bind(this.fname, this.fname.value);
  }

  // onSubmit(form: NgForm){
  //   console.log(form);
  // }

  fillForm() {
    this.myform.setValue({
      userData: {
        userName: "manoj",
        password: "mypassword"
      },
      name: 'some name',
      email: "sam@sam.com"
    });

    // this.myform.form.patchValue({
    //   userData: {        
    //     password: "mypassword"
    //   },
    //   name: 'some name',
    //   email: "sam@sam.com"
    // });
  }

  clearForm() {
    this.myform.reset();
  }

  onSubmit(form: NgForm) {
    console.log(form);

    this.user.userName = this.myform.value.userData.userName;
    this.user.password = this.myform.value.userData.password;
    this.user.name = this.myform.value.name;
    this.user.email = this.myform.value.email;

    console.log(this.user);
  }

  forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? { 'forbiddenName': { value: control.value } } : null;
    }
  }

}


