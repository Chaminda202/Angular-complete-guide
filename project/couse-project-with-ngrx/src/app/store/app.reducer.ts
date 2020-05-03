import * as fromShoopingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';


export interface AppState {
  shoppingList: fromShoopingList.State;
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> =  {
  shoppingList: fromShoopingList.shoppingListReducer,
  auth: fromAuth.authReducer
}
