import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];

  constructor() { }

  ngOnInit(): void {
    this.ingredients = [
      new Ingredient('Apple', 20),
      new Ingredient('Tomato', 5)
    ]
  }

  onAddIngredient(ingredient: Ingredient) {
    console.log(JSON.stringify(ingredient));
    this.ingredients.push(ingredient);
  }

}
