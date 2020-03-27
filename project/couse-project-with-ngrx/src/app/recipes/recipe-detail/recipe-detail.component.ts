import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy{
  recipe: Recipe;
  subcription: Subscription;
  recipeIndex: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.subcription = this.route.params
          .subscribe(
            (params: Params) => {
              this.recipeIndex = +params['id'];
              this.recipe = this.recipeService.getRecipe(this.recipeIndex);
            }
          );
  }

  onAddToShoppingList() {
    this.recipeService.addToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.recipeIndex);
    this.router.navigate(['/recipes']);
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }
}
