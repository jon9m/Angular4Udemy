import { ShoppingListComponent } from "app/shopping-list/shopping-list.component";
import { RecipesComponent } from "app/recipes/recipes.component";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthGuard } from "app/auth-guard.service";
import { RecipeStartComponent } from "app/recipes/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "app/recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "app/recipes/recipe-edit/recipe-edit.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    {
        path: 'recipes', canActivate: [AuthGuard], component: RecipesComponent, children: [
            { path: '', component: RecipeStartComponent },
            { path: 'new', component: RecipeEditComponent },
            { path: ':id', component: RecipeDetailComponent },            
            { path: ':id/edit', component: RecipeEditComponent }
        ]
    },
    { path: 'shoppinglist', component: ShoppingListComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {

}