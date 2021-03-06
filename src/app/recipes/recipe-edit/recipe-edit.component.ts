import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { RecipeService } from "app/recipes/recipes.service";
import { Recipe } from "app/recipes/recipe.model";
import { CanMyComponentDeactivate } from "app/canDeactivate-guard.service";
import { Observable } from "rxjs/Rx";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, CanMyComponentDeactivate {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  recipeName: string;
  imagePath: string;
  description: string;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  private initForm() {

    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;

      this.recipeName = recipe.name;

      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe.ingredients) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          }))
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  getControls(recipeForm) {
    return recipeForm.get('ingredients').controls;
  }

  onSubmit() {
    // const recipe = new Recipe(
    //   this.recipeForm.value.name,
    //   this.recipeForm.value.description,
    //   this.recipeForm.value.imagePath,
    //   this.recipeForm.value.ingredients);
    if (this.editMode) {
      // this.recipeService.uppdateRecipe(this.id, recipe);
      this.recipeService.uppdateRecipe(this.id, this.recipeForm.value);
    } else {
      // this.recipeService.addRecipe(recipe);
      this.recipeService.addRecipe(this.recipeForm.value);
    }

    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  onCancel() {
    this.editMode = false;
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredient(i) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(i);
  }

  canMyComponenetDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.editMode) {
      return true;
    } else {
      if ((this.recipeName !== this.recipeForm.value.name) ||
        (this.imagePath !== this.recipeForm.value.imagePath) ||
        (this.description !== this.recipeForm.value.description)) {
        return confirm('You have unsaved data, do you want to continue?');
      }
    }
  }
}
