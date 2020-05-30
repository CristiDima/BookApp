import { NgModule } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { BusinessProfileComponent } from './business-profile.component';
import { BusinessPaymentComponent } from '../business-payment/business-payment.component';
import { BusinessService } from './business-service';
import { EmployeesComponent } from '../employees/employees.component';

@NgModule({
    declarations: [
        BusinessProfileComponent,
        BusinessPaymentComponent,
        EmployeesComponent
    ],
    imports: [MaterialModule, BrowserModule],
    providers: [BusinessService],
    bootstrap: [],
    exports: []
  })
  export class BusinessProfileModule { }