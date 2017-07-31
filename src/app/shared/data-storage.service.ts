import { Http } from '@angular/http';
import { Injectable } from "@angular/core";
import { RecipeService } from "app/recipes/recipes.service";
import { FireBaseAuthService } from "app/auth/firebase.auth.service";

@Injectable()
export class DataStorageService {
    constructor(private http: Http, private recipeService: RecipeService, private authService: FireBaseAuthService) { }

    storeRecipes() {
        const token = this.authService.getToken();
        return this.http.put("https://ng-recipe-book-db906.firebaseio.com/data.json?auth=" + token, this.recipeService.getRecipes());
    }

    getRecipes() {
        const token = this.authService.getToken();
        return this.http.get("https://ng-recipe-book-db906.firebaseio.com/data.json?auth=" + token);
    }
}