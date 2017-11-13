import { Ingredient } from "app/shared/ingredient.model";
import * as ShoppingListActions from "app/shopping-list/shopping-list-actions";

const initialState = {
    ingredients: [
        new Ingredient("apples", 5),
        new Ingredient("tomato", 10),
        new Ingredient("onion", 2)
    ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,  //all old properties of object added to the new object plus new ingredient property which is array
                ingredients: [...state.ingredients, action.payload]    // add all elements of the array and new element
                //refer to a new file shoppinglist.actions.ts
            }
        case ShoppingListActions.DELETE_INGREDIENT:
            state.ingredients.splice(action.payload, 1);            
            return {
                ...state,
                ingredients: [...state.ingredients]
            }
        default:
            return state;
    }
}