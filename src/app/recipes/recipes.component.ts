import { Component, OnInit } from '@angular/core';
import { Recipe } from "app/recipes/recipe.model";
import { RecipeService } from "app/recipes/recipes.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {

  ngOnInit() {

  }
}
