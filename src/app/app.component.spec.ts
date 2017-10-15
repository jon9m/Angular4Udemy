import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { HeaderComponent } from "app/Header/header.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "app/app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { ShoppingListService } from "app/shopping-list/shopping-list.service";
import { RecipesComponent } from "app/recipes/recipes.component";
import { RecipeDetailComponent } from "app/recipes/recipe-detail/recipe-detail.component";
import { RecipeListComponent } from "app/recipes/recipe-list/recipe-list.component";
import { RecipeItemComponent } from "app/recipes/recipe-list/recipe-item/recipe-item.component";
import { ShoppingListComponent } from "app/shopping-list/shopping-list.component";
import { ShoppingEditComponent } from "app/shopping-list/shopping-edit/shopping-edit.component";
import { DropdownDirective } from "app/shared/dropdown.directive";
import { RecipeStartComponent } from "app/recipes/recipe-start/recipe-start.component";
import { RecipeEditComponent } from "app/recipes/recipe-edit/recipe-edit.component";
import { SigninComponent } from "app/auth/signin/signin.component";
import { SignupComponent } from "app/auth/signup/signup.component";
import { HomeComponent } from "app/home/home.component";
import { AuthGuard } from "app/auth-guard.service";
import { RecipeService } from "app/recipes/recipes.service";
import { DataStorageService } from "app/shared/data-storage.service";
import { FireBaseAuthService } from "app/auth/firebase.auth.service";
import { APP_BASE_HREF } from "@angular/common";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        ShoppingListComponent,
        ShoppingEditComponent,
        DropdownDirective,
        RecipeStartComponent,
        RecipeEditComponent,
        SignupComponent,
        SigninComponent,
        HomeComponent
      ],
      imports: [
        AppRoutingModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule
      ],
      providers: [ShoppingListService, AuthGuard, RecipeService, DataStorageService, FireBaseAuthService, {provide: APP_BASE_HREF, useValue: '/recipebook'}],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('recipebook');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Welcome to the Recipe Book');
  }));
});
