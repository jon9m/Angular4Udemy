import * as firebase from 'firebase';
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class FireBaseAuthService {
    token: string;
    constructor(private router:Router) { }

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(
            (error) => console.log(error)
            );
    }

    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
           .then(
            (response) => {
                this.router.navigate(['/']);
                firebase.auth().currentUser.getToken().then(
                    (tk: string) => { this.token = tk }
                )
            }
            )
            .catch(
            (error) => console.log(error)
            );
    }

    getToken() {
        firebase.auth().currentUser.getToken().then(
            (tk: string) => { 
                this.token = tk;
            }
        );      //Async action - firebase take token from local storage and chaneck it with server
        //and tries to give a new one if invalid
        return this.token;
    }

    isAuthenticated(){       
        return this.token != null;
    }

    logout(){
        firebase.auth().signOut();
        this.token = null;
    }
}