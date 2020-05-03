import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CustomerEffect } from './state/customer.effects';

import { CustomerComponent } from './customer/customer.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { customerReducer } from './state/customer.reducer';


@NgModule({
  declarations: [
    CustomerComponent,
    CustomerAddComponent,
    CustomerEditComponent, 
    CustomerListComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('customers', customerReducer),
    CustomersRoutingModule,
    EffectsModule.forFeature([CustomerEffect])
  ]
})
export class CustomersModule { }
