import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from "app/shared/ingredient.model";
import { ShoppingListService } from "app/shopping-list/shopping-list.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {


  // @ViewChild('nameInput') nameInputReference: ElementRef;
  // @ViewChild('amountInput') amountInputReference: ElementRef;

  @ViewChild('f') slForm: NgForm;

  constructor(private shoppingListService: ShoppingListService) { }

  subscription: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);

        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  onAddItem(form: NgForm) {
    // const newIngredient = new Ingredient(this.nameInputReference.nativeElement.value, this.amountInputReference.nativeElement.value);
    // this.shoppingListService.addIngredient(newIngredient);

    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (!this.editMode) {
      this.shoppingListService.addIngredient(newIngredient);
    } else {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    }

    this.editMode = false;
    form.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClear() {
    this.editMode = false;;
    this.slForm.reset();
  }

  onDelete(){
    this.onClear();
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
  }

}
