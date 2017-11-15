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

  defaultName:string;  

  constructor() { }

  ngOnInit() {
    this.defaultName = "default name from ts [ngModal]=value";
    this.forbiddenNameValidator.bind(this.fname, this.fname.value);
  }

  // onSubmit(form: NgForm){
  //   console.log(form);
  // }

  onSubmit(form: NgForm) {
    console.log(form);
  }

  forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? { 'forbiddenName': { value: control.value } } : null;
    }
  }

}


