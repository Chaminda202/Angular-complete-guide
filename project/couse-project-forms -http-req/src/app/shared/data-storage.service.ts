import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService) {}

  saveRecipies() {
    const recipes = this.recipeService.getRecipeList();
    this.http.put(
      'https://angular-http-8ac32.firebaseio.com/recipes.json',
      recipes
    ).subscribe(response => {
      console.log(response);
    });
  }

  /*
  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(
      'https://angular-http-8ac32.firebaseio.com/recipes.json'
    );
  }

 fetchRecipes() {
    this.http.get<Recipe[]>(
      'https://angular-http-8ac32.firebaseio.com/recipes.json'
    ).subscribe(data => {
      this.recipeService.setRecipeList(data);
    });
 }

fetchRecipes() {
  this.http.get<Recipe[]>(
    'https://angular-http-8ac32.firebaseio.com/recipes.json'
  )
  .pipe(
    map(recipes => {
      return recipes.map(recipe => {
        return  {...recipe, ingredient: recipe.ingredients ? recipe.ingredients : []};
      });
    })
  )
  .subscribe(data => {
    this.recipeService.setRecipeList(data);
  });
}
*/

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(
      'https://angular-http-8ac32.firebaseio.com/recipes.json'
    )
    .pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return  {...recipe, ingredient: recipe.ingredients ? recipe.ingredients : []};
        });
      }),
      tap(data => {
        this.recipeService.setRecipeList(data);
      })
    );
  }
}
