import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css']
})
export class ShoppingItemComponent implements OnInit, OnDestroy {
  @ViewChild('form') shoppingForm: NgForm;
  editMode = false;
  itemNumber: number;
  subcription: Subscription;
  selectedItem: Ingredient;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.subcription = this.shoppingService.shoppingItemChangeSub
          .subscribe((index: number) => {
            this.editMode = true;
            this.itemNumber = index;
            this.selectedItem = this.shoppingService
                          .getIngredient(this.itemNumber);
            // set whole details
            this.shoppingForm.setValue({
              name: this.selectedItem.name,
              amount: this.selectedItem.amount
            });
          });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const ingredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      console.log('Click edit button ' + this.itemNumber + ' value ' + JSON.stringify(ingredient));
      this.shoppingService.updateIngredient(this.itemNumber, ingredient);
    } else {
      console.log('Click add button');
      this.shoppingService.addIngredient(ingredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.shoppingForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingService.deleteIngredient(this.itemNumber);
    this.onClear();
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }
}
