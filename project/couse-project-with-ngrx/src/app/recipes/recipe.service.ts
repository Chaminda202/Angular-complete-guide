import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class RecipeService {
  recipeListChangeSub = new Subject<Recipe[]>();
  private recipeList: Recipe[] = [];

  constructor(private store: Store<fromApp.AppState>) {}


  setRecipeList(recipes: Recipe[]) {
    this.recipeList = recipes;
    this.recipeListChangeSub.next(this.recipeList.slice());
  }

  getRecipeList() {
    return this.recipeList.slice();
  }

  addToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  getRecipe(id: number) {
    return this.recipeList[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipeList.push(recipe);
    this.recipeListChangeSub.next(this.recipeList.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipeList[index] = recipe;
    this.recipeListChangeSub.next(this.recipeList.slice());
  }

  deleteRecipe(index: number) {
    this.recipeList.splice(index, 1);
    this.recipeListChangeSub.next(this.recipeList.slice());
  }
}
