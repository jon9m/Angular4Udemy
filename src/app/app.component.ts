import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

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
