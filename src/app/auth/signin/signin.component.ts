import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { FireBaseAuthService } from "app/auth/firebase.auth.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService: FireBaseAuthService) { }

  ngOnInit() {
  }

  onSignIn(form: NgForm) {
    const email = form.value.email;
    const pwd = form.value.password;

    this.authService.signinUser(email, pwd);
  }
}
