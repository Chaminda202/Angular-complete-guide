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
        case customersActions.CustomerActionTypes.LOAD_CUSTOMER_SUCCESS: {
            return customerAdapter.addOne(
                action.payload, 
                {
                    ...state,
                   selectedCustomerId: action.payload.id
                }
            );
        }
        case customersActions.CustomerActionTypes.LOAD_CUSTOMER_FAIL: {
            return {
                ...state,
                error: action.payload
            };
        }
        case customersActions.CustomerActionTypes.CREATE_CUSTOMER_SUCCESS: {
            return customerAdapter.addOne(action.payload,state);
        }
        case customersActions.CustomerActionTypes.CREATE_CUSTOMER_FAIL: {
            return {
                ...state,
                error: action.payload
            };
        }
        case customersActions.CustomerActionTypes.UPDATE_CUSTOMER_SUCCESS: {
            return customerAdapter.updateOne(action.payload,state);
        }
        case customersActions.CustomerActionTypes.UPDATE_CUSTOMER_FAIL: {
            return {
                ...state,
                error: action.payload
            };
        }
        case customersActions.CustomerActionTypes.DELETE_CUSTOMER_SUCCESS: {
            return customerAdapter.removeOne(action.payload,state);
        }
        case customersActions.CustomerActionTypes.DELETE_CUSTOMER_FAIL: {
            return {
                ...state,
                error: action.payload
            };
        }
        default: {
            return state;
        }
    }
}

// selectors
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

export const getCurrentCustomerId = createSelector(
    getCustomerFeatureState,
    (state: CustomerState) => state.selectedCustomerId
);

export const getCurrentCustomer = createSelector(
    getCustomerFeatureState,
    getCurrentCustomerId,
    state => state.entities[state.selectedCustomerId]
);
