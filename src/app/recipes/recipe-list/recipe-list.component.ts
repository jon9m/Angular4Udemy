import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from "../recipe.model";
import { RecipeService } from "app/recipes/recipes.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit {

  private recipes: Recipe[];
  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }

  // ngOnDestroy(): void {
  //   this.recipeService.recipesChanged.unsubscribe();
  // }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
