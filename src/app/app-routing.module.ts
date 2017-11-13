import { ShoppingListComponent } from "app/shopping-list/shopping-list.component";
import { RecipesComponent } from "app/recipes/recipes.component";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthGuard } from "app/auth-guard.service";
import { RecipeStartComponent } from "app/recipes/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "app/recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "app/recipes/recipe-edit/recipe-edit.component";
import { SignupComponent } from "app/auth/signup/signup.component";
import { SigninComponent } from "app/auth/signin/signin.component";
import { HomeComponent } from "app/home/home.component";
import { CanDeactivateGuard } from "app/canDeactivate-guard.service";
import { ErorPageComponent } from "app/eror-page/eror-page.component";

const appRoutes: Routes = [

    // { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: '', component: HomeComponent },
    {
        path: 'recipes', component: RecipesComponent, children: [
            { path: '', component: RecipeStartComponent },
            { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard] },
            { path: ':id', component: RecipeDetailComponent },
            { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard] }
        ]
    },
    { path: 'shoppinglist', component: ShoppingListComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'not-found', component: ErorPageComponent, data: { message: 'Page not found!' } },
    { path: '**', redirectTo: "/not-found" }
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