import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from "app/recipes/recipe.model";
import { RecipeService } from "app/recipes/recipes.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs/Rx";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  selectedRecipeDetail: Recipe;
  id: number;
  sub: Subscription;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];  //+ cast to number
        this.selectedRecipeDetail = this.recipeService.getRecipe(this.id);
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onAddToShopplingList() {
    this.recipeService.addIngredientsToShoppingList(this.selectedRecipeDetail.ingredients)
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
