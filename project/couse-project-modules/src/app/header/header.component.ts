import { Component, OnInit, OnDestroy} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticate = false;
  subcriUser: Subscription;

  constructor(private dataStorageService: DataStorageService,
              private recipeService: RecipeService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.subcriUser = this.authService.userSub.subscribe(user => {
      this.isAuthenticate = !user ? false : true; // !!user
    });
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

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.subcriUser.unsubscribe();
  }
}
