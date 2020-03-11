import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  selectedItem: Recipe;
  constructor() { }

  ngOnInit(): void {
  }

  onClickeItem(item: Recipe) {
    console.log('Slected Item ' + JSON.stringify(item));
    this.selectedItem = item;
  }
}
