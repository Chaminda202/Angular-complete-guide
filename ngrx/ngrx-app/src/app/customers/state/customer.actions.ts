import { Action } from '@ngrx/store';
import { Customer } from '../customer.model';

export enum CustomerActionTypes {
    LOAD_CUSTOMERS = '[Customer] Load customers',
    LOAD_CUSTOMERS_SUCCESS = '[Customer] Load customers success',
    LOAD_CUSTOMERS_FAIL = '[Customer] Load customers fail'
}

export class LoadCustomers implements Action {
    readonly type = CustomerActionTypes.LOAD_CUSTOMERS;
}

export class LoadCustomersSuccess implements Action {
    readonly type = CustomerActionTypes.LOAD_CUSTOMERS_SUCCESS;
    constructor(public payload: Customer[]) {}
}

export class LoadCustomersFail implements Action {
    readonly type = CustomerActionTypes.LOAD_CUSTOMERS_FAIL;
    constructor(public payload: string) {}
}

export type ActionType = LoadCustomers | LoadCustomersSuccess | LoadCustomersFail;