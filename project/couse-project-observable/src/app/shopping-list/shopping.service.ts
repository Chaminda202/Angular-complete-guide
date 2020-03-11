import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingService {
  ingredientsChangedSub = new Subject<Ingredient[]>();

  private ingredient: Ingredient[] = [
    new Ingredient('Apple', 20),
    new Ingredient('Tomato', 5)
  ];

  getIngredient() {
    return this.ingredient.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredient.push(ingredient);
    this.ingredientsChangedSub.next(this.ingredient.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
   this.ingredient.push(...ingredients);
   this.ingredientsChangedSub.next(this.ingredient.slice());
  }
}
