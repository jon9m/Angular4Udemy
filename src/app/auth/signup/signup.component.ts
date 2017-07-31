import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { FireBaseAuthService } from "app/auth/firebase.auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: FireBaseAuthService) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const email = form.value.email;
    const pwd = form.value.password;

    this.authService.signupUser(email, pwd);
  }

}
