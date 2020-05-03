import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'

import * as customerActions from '../state/customer.actions';
import * as customerReducer from '../state/customer.reducer';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  /*
  customers;
  constructor(private store: Store<any>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new customerActions.LoadCustomers);
    this.store.subscribe(state => {
      this.customers = state.customers.customers;
    });
  }
  */
  customers$: Observable<Customer[]>;
  constructor(private store: Store<customerReducer.AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new customerActions.LoadCustomers);
    this.customers$ = this.store.pipe(
      select(customerReducer.getCustomers)
    );
  }
}
