import { Injectable } from '@angular/core';

import  { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError} from 'rxjs/operators'

import { CustomerService } from '../customer.service';
import * as customerActions from './customer.actions';
import { Customer } from '../customer.model';

@Injectable()
export class CustomerEffect {
    constructor(private actions$: Actions,
        private customerService: CustomerService) { } 

    @Effect()
    loadCustomers$: Observable<Action> = this.actions$.pipe(
        ofType<customerActions.LoadCustomers>(
            customerActions.CustomerActionTypes.LOAD_CUSTOMERS
        ),
        mergeMap(
            (action: customerActions.LoadCustomers) => 
            this.customerService.getCustomers().pipe(
                map((customers: Customer[]) =>{
                   return new customerActions.LoadCustomersSuccess(customers);
                }),
                catchError((error) => {
                    return of(new customerActions.LoadCustomersFail(error));
                })
            )
        )
    );

    @Effect()
    loadCustomer$: Observable<Action> = this.actions$.pipe(
        ofType<customerActions.LoadCustomer>(
            customerActions.CustomerActionTypes.LOAD_CUSTOMER
        ),
        mergeMap(
            (action: customerActions.LoadCustomer) => 
            this.customerService.getCustomerById(action.payload).pipe(
                map((customer: Customer) =>{
                   return new customerActions.LoadCustomerSuccess(customer);
                }),
                catchError((error) => {
                    return of(new customerActions.LoadCustomerFail(error));
                })
            )
        )
    );

    @Effect()
    createCustomer$: Observable<Action> = this.actions$.pipe(
        ofType<customerActions.CreateCustomer>(
            customerActions.CustomerActionTypes.CREATE_CUSTOMER
        ),
        map((action: customerActions.CreateCustomer) => action.payload),
        mergeMap(
            (customer: Customer) => 
            this.customerService.createCustomer(customer).pipe(
                map((customer: Customer) =>{
                   return new customerActions.CreateCustomerSuccess(customer);
                }),
                catchError((error) => {
                    return of(new customerActions.CreateCustomerFail(error));
                })
            )
        )
    );

    @Effect()
    updateCustomer$: Observable<Action> = this.actions$.pipe(
        ofType<customerActions.UpdateCustomer>(
            customerActions.CustomerActionTypes.UPDATE_CUSTOMER
        ),
        map((action: customerActions.UpdateCustomer) => action.payload),
        mergeMap(
            (customer: Customer) => 
            this.customerService.updateCustomer(customer).pipe(
                map((customer: Customer) =>{
                   return new customerActions.UpdateCustomerSuccess({
                       id: customer.id,
                       changes: customer
                   });
                }),
                catchError((error) => {
                    return of(new customerActions.UpdateCustomerFail(error));
                })
            )
        )
    );

    @Effect()
    deleteCustomer$: Observable<Action> = this.actions$.pipe(
        ofType<customerActions.DeleteCustomer>(
            customerActions.CustomerActionTypes.DELETE_CUSTOMER
        ),
        map((action: customerActions.DeleteCustomer) => action.payload),
        mergeMap(
            (id: number) => 
            this.customerService.deleteCustomer(id).pipe(
                map(() =>{
                   return new customerActions.DeleteCustomerSuccess(id);
                }),
                catchError((error) => {
                    return of(new customerActions.DeleteCustomerFail(error));
                })
            )
        )
    );
}