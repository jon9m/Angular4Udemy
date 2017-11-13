import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from "@angular/router";

@Component({
  selector: 'app-eror-page',
  templateUrl: './eror-page.component.html',
  styleUrls: ['./eror-page.component.css']
})
export class ErorPageComponent implements OnInit {

  errorMessage: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    //this.errorMessage = this.route.snapshot.data['message'];

    this.route.data.subscribe((data: Data) => {
      this.errorMessage = data['message'];
    });
  }
}
