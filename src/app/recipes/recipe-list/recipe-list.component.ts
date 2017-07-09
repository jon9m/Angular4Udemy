import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit {

  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe("TestRecipe", "This is a test recipe", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZy3YavTDlhy-IeQHoCXv4daRgR6qwqvq4VNvUjqYn1jUOvOBi"),
    new Recipe("Chicken Curry", "This is a hot Chicken Curry recipe", "http://www.seriouseats.com/images/2015/09/20150914-pressure-cooker-recipes-roundup-09.jpg"),
    new Recipe("Garlic Bread", "This is a Garlic Bread recipe", "http://www.seriouseats.com/recipes/assets_c/2016/05/20160503-fava-carrot-ricotta-salad-recipe-1-thumb-1500xauto-431710.jpg")
  ];

  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipeItem: Recipe) {
    this.recipeWasSelected.emit(recipeItem);
  }

}
