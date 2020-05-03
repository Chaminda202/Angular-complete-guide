/*
const initialState = {
    customers: [
        {
            "name": "John Doe",
            "phone": "910928392098",
            "address": "123 Sun Street",
            "membership": "Platinum",
            "id": 1
        }
    ],
    loading: false,
    loaded: true
}

export function customerReducer(state = initialState, action) {
    switch (action.type) {
        case "LOAD_CUSTOMER": {
            return {
                ...state,
                loading: true,
                loaded: false
            };
        }
        default: {
            return state;
        }
    }
}

// without ngrx entity

import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as customersActions from './customer.actions';
import { Customer } from '../customer.model';
import * as fromRoot from '../../state/app-state';

export interface CustomerState {
    customers: Customer[];
    loading: boolean;
    loaded: boolean;
    error: string;
}

export interface AppState extends fromRoot.AppState {
    customerState: CustomerState;
}

export const initialState: CustomerState = {
    customers: [],
    loading: false,
    loaded: false,
    error: ''
}

export function customerReducer(state= initialState, action: customersActions.ActionType): CustomerState {
    switch(action.type) {
        case customersActions.CustomerActionTypes.LOAD_CUSTOMERS : {
            return {
                ...state,
                loading: true
            }
        }
        case customersActions.CustomerActionTypes.LOAD_CUSTOMERS_SUCCESS: {
            return {
                ...state,
                loading: false,
                loaded: true,
                customers: action.payload
            }
        }
        case customersActions.CustomerActionTypes.LOAD_CUSTOMERS_FAIL: {
            return {
                ...state,
                customers: [],
                loading: false,
                loaded: false,
                error: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

const getCustomerFeatureState = createFeatureSelector<CustomerState>(
    "customers"
);

export const getCustomers = createSelector(
    getCustomerFeatureState,
    (state: CustomerState) => state.customers
);

export const getCustomersLoading = createSelector(
    getCustomerFeatureState,
    (state: CustomerState) => state.loading
);

export const getCustomersLoaded = createSelector(
    getCustomerFeatureState,
    (state: CustomerState) => state.loaded
);

export const getCustomersError = createSelector(
    getCustomerFeatureState,
    (state: CustomerState) => state.error
);
*/

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'


import * as customersActions from './customer.actions';
import { Customer } from '../customer.model';
import * as fromRoot from '../../state/app-state';

export interface CustomerState extends EntityState<Customer> {
    selectedCustomerId: number | null;
    loading: boolean;
    loaded: boolean;
    error: string;
}

export interface AppState extends fromRoot.AppState {
    customerState: CustomerState;
}

export const customerAdapter: EntityAdapter<Customer> = createEntityAdapter<Customer>();

export const defaultCustomer: CustomerState = {
    ids: [],
    entities: {},
    selectedCustomerId: null,
    loading: false,
    loaded: false,
    error: ''
}

export const initialState = customerAdapter.getInitialState(defaultCustomer);

export function customerReducer(state= initialState, action: customersActions.ActionType): CustomerState {
    switch(action.type) {
        case customersActions.CustomerActionTypes.LOAD_CUSTOMERS : {
            return {
                ...state,
                loading: true
            }
        }
        case customersActions.CustomerActionTypes.LOAD_CUSTOMERS_SUCCESS: {
            return customerAdapter.addAll(
                action.payload, 
                {
                    ...state,
                    loading: false,
                    loaded: true
                }
            );
        }
        case customersActions.CustomerActionTypes.LOAD_CUSTOMERS_FAIL: {
            return {
                ...state,
                entities: {},
                loading: false,
                loaded: false,
                error: action.payload
            };
        }
        default: {
            return state;
        }
    }
}

const getCustomerFeatureState = createFeatureSelector<CustomerState>(
    "customers"
);

export const getCustomers = createSelector(
    getCustomerFeatureState,
    customerAdapter.getSelectors().selectAll
);

export const getCustomersLoading = createSelector(
    getCustomerFeatureState,
    (state: CustomerState) => state.loading
);

export const getCustomersLoaded = createSelector(
    getCustomerFeatureState,
    (state: CustomerState) => state.loaded
);

export const getCustomersError = createSelector(
    getCustomerFeatureState,
    (state: CustomerState) => state.error
);

