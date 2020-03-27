import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { Observable } from 'rxjs';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolver implements Resolve<Recipe[]> {
  constructor(private dataStorageService: DataStorageService,
              private recipeService: RecipeService) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Recipe[]>|Promise<Recipe[]>|Recipe[] {
      if (this.recipeService.getRecipeList().length === 0) {
        return this.dataStorageService.fetchRecipes();
      } else {
        this.recipeService.getRecipeList();
      }
  }
}
