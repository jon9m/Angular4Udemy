import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title:string = "recipebook";

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: "AIzaSyBpJpYU4BAt9lhRIyGCImFGwhhAj-U3mYg",
      authDomain: "ng-recipe-book-db906.firebaseapp.com"
    });
  }

  loadedFeature: string = 'recipe';

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

  constructor(private router: Router, private route: ActivatedRoute) { }
  // ngAfterViewInit() { //A Lifecycle method
  //   this.router.navigate(['/recipes']);  //load recipe module after app loading
  //   // this.router.navigate(['recipes'], { relativeTo: this.route });
  // }
}
