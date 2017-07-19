import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "app/shopping-list/shopping-list.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {  

  private ingredients: Ingredient[];

  private shopplingListSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();

    this.shopplingListSubscription = this.shoppingListService.ingredientChanged.subscribe( //Event emitter or Subject notify modifications to the array
      (ingredientArr: Ingredient[]) => {
        this.ingredients = ingredientArr;
      }
    );
  }

  ngOnDestroy(): void {                  
    this.shopplingListSubscription.unsubscribe();  //For shopping list 'Subject' since its custom Observable !!!
                                                   // No need for EventEmitter 
  }
}
