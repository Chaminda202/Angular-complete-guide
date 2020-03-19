import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  editRecipe: Recipe;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params
        .subscribe(
          (params: Params) => {
            this.id = +params['id'];
            this.editMode = params['id'] !=  null;
            this.editRecipe = this.recipeService.getRecipe(this.id);
            this.initForm();
            console.log('Id ' + this.id + ' Edit mode ' + this.editMode);
          }
        );
  }

  private initForm() {
    let recipeName = '';
    let description = '';
    let imagePath = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      recipeName = this.editRecipe.name;
      description = this.editRecipe.description;
      imagePath = this.editRecipe.imagePath;

      if (this.editRecipe['ingredients'.toString()]) {
        for (const ingredient of this.editRecipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
             name: new FormControl(ingredient.name, Validators.required),
             amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*/)])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
        name: new FormControl(recipeName, Validators.required),
        description: new FormControl(description, Validators.required),
        imagePath: new FormControl(imagePath, Validators.required),
        ingredients: recipeIngredients
      });
  }

  get ingredientsArray() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  onAddIngredient() {
    this.ingredientsArray.push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*/)])
      })
    );
  }

  onSubmit() {
    /*
    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients'],
      );
      */
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onClear();
  }

  onDeleteIngredient(index: number) {
    this.ingredientsArray.removeAt(index);
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.id);
    this.onClear();
  }

  onClear() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
