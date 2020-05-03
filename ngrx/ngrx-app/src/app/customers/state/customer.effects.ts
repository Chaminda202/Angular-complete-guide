import { Injectable } from '@angular/core';

import  { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
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
            (actions) => 
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

    /*
    @Effect()
    loadCustomers$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType<customerActions.LoadCustomers>(
                customerActions.CustomerActionTypes.LOAD_CUSTOMERS
            ),
            mergeMap(action => 
                this.customerService.getCustomers().pipe(
                    map((customers: Customer[]) =>{
                        return new customerActions.LoadCustomersSuccess(customers);
                    }),
                    catchError((error) => {
                        return of(new customerActions.LoadCustomersFail(error));
                    })
                )
            )
        )
    );
    */
}