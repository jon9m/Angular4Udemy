import { Ingredient } from "app/shared/ingredient.model";
import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs/Subject";

export class ShoppingListService {

//    ingredientChanged = new EventEmitter<Ingredient[]>();
ingredientChanged = new Subject<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient("apples", 5),
        new Ingredient("tomato", 10),
        new Ingredient("onion", 2)
    ];

    getIngredients() {
        return this.ingredients.slice();  //Remove slice, or add Event emitter to notify modifications to the array.
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
//        this.ingredientChanged.emit(this.ingredients.slice());
        this.ingredientChanged.next(this.ingredients.slice());
    }


    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients); //ES6 Spread operator
//        this.ingredientChanged.emit(this.ingredients.slice());
        this.ingredientChanged.next(this.ingredients.slice());
    }
}