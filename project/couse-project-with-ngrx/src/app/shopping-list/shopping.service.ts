import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingService {
  ingredientsChangedSub = new Subject<Ingredient[]>();
  shoppingItemChangeSub = new Subject<number>();

  private ingredient: Ingredient[] = [
    new Ingredient('Apple', 20),
    new Ingredient('Tomato', 5)
  ];

  getIngredients() {
    return this.ingredient.slice();
  }

  getIngredient(index: number) {
    return this.ingredient[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredient.push(ingredient);
    this.ingredientsChangedSub.next(this.ingredient.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
   this.ingredient.push(...ingredients);
   this.ingredientsChangedSub.next(this.ingredient.slice());
  }

  updateIngredient(index: number, ingredient: Ingredient) {
    this.ingredient[index] = ingredient;
    this.ingredientsChangedSub.next(this.ingredient.slice());
  }

  deleteIngredient(index: number) {
    this.ingredient.splice(index, 1);
    this.ingredientsChangedSub.next(this.ingredient.slice());
  }
}
