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
  customers$: Observable<Customer[]>;
  error$: Observable<String>;

  constructor(private store: Store<customerReducer.AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new customerActions.LoadCustomers);
    this.customers$ = this.store.pipe(
      select(customerReducer.getCustomers)
    );
    this.error$ = this.store.pipe(select(customerReducer.getCustomersError))
  }

  deleteCustomer(customer: Customer) {
    if ( confirm('Are you sure to delete this customer?')) {
      this.store.dispatch(new customerActions.DeleteCustomer(customer.id));
    }
  }

  editCustomer(customer: Customer) {
    this.store.dispatch(new customerActions.LoadCustomer(customer.id));
  }
}
