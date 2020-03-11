import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  private ingredient: Ingredient[] = [
    new Ingredient('Apple', 20),
    new Ingredient('Tomato', 5)
  ];

  getIngredient() {
    return this.ingredient.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredient.push(ingredient);
    this.ingredientsChanged.emit(this.ingredient.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    /*
    for (const ingredient of ingredients) {
      this.ingredient.push(ingredient);
    }
    */
   this.ingredient.push(...ingredients);
   this.ingredientsChanged.emit(this.ingredient.slice());
  }
}
