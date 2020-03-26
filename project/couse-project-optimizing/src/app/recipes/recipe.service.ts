import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shopping-list/shopping.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipeListChangeSub = new Subject<Recipe[]>();
  /*
  private recipeList: Recipe[] = [
    new Recipe(
      'Recipe one',
      'How to prepare recipe one',
      'https://images-gmi-pmc.edge-generalmills.com/1e24b5e7-e3e3-43ce-b737-a2215397f006.jpg',
      [
        new Ingredient('Potato', 1),
        new Ingredient('Meat', 2)
      ]),
    new Recipe(
      'Recipe two',
      'How to prepare recipe two',
      'https://images-gmi-pmc.edge-generalmills.com/1e24b5e7-e3e3-43ce-b737-a2215397f006.jpg',
      [
        new Ingredient('Meat', 5),
        new Ingredient('Tomato', 2)
      ])
  ];
  */
  private recipeList: Recipe[] = [];

  constructor(private shoppingService: ShoppingService) {}


  setRecipeList(recipes: Recipe[]) {
    this.recipeList = recipes;
    this.recipeListChangeSub.next(this.recipeList.slice());
  }

  getRecipeList() {
    return this.recipeList.slice();
  }

  addToShoppingList(ingredients: Ingredient[]) {
    this.shoppingService.addIngredients(ingredients);
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
