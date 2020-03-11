import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css']
})
export class ShoppingItemComponent implements OnInit {
  @ViewChild('nameInput') name: ElementRef;
  @ViewChild('amountInput') amount: ElementRef;
  @Output() ingredientDetails = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.amount.nativeElement.value + ' ' + this.name.nativeElement.value);
    this.ingredientDetails.emit(
      new Ingredient(this.name.nativeElement.value, this.amount.nativeElement.value));
  }
}
