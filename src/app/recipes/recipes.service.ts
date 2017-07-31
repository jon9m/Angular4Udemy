import { Recipe } from "app/recipes/recipe.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "app/shared/ingredient.model";
import { ShoppingListService } from "app/shopping-list/shopping-list.service";
import { Subject } from "rxjs/Subject";

@Injectable()
export class RecipeService {

    constructor(private shoppingListService: ShoppingListService) {
    }

    recipeSelected = new EventEmitter<Recipe>();

    recipesChanged: Subject<Recipe[]> = new Subject();

    private recipes: Recipe[] = [
        new Recipe(
            "TestRecipe",
            "This is a test recipe",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZy3YavTDlhy-IeQHoCXv4daRgR6qwqvq4VNvUjqYn1jUOvOBi",
            [
                new Ingredient('meat', 2),
                new Ingredient('potato', 12),
                new Ingredient('egg', 2)
            ]
        ),
        new Recipe(
            "Chicken Curry",
            "This is a hot Chicken Curry recipe",
            "http://www.seriouseats.com/images/2015/09/20150914-pressure-cooker-recipes-roundup-09.jpg",
            [
                new Ingredient('rice', 2),
                new Ingredient('tomato', 12),
                new Ingredient('viniger', 2)
            ]
        ),
        new Recipe(
            "Garlic Bread",
            "This is a Garlic Bread recipe",
            "http://www.seriouseats.com/recipes/assets_c/2016/05/20160503-fava-carrot-ricotta-salad-recipe-1-thumb-1500xauto-431710.jpg",
            [
                new Ingredient('chicken', 2),
                new Ingredient('ham', 12),
                new Ingredient('egg', 2)
            ]
        )
    ];

    getRecipes() {
        return this.recipes.slice(); //Get only a copy of the array
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    uppdateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index:number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

    setRecipes(recipes:Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
}