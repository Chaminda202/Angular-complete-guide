import { Component, OnInit} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from '../recipes/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private dataStorageService: DataStorageService,
              private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  onSaveRecipes() {
    this.dataStorageService.saveRecipies();
  }

  /*
  onFetchData() {
    this.dataStorageService.fetchRecipes()
          .subscribe(data => {
            console.log(data);
            this.recipeService.recipeListChangeSub.next(data);
          });
  }
  */

 onFetchData() {
  this.dataStorageService.fetchRecipes().subscribe();
 }
}
