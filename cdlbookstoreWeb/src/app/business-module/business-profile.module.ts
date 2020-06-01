import { NgModule } from '@angular/core';
import { BusinessProfileComponent } from './business-profile/business-profile.component';
import { EmployeesComponent } from './employees/employees.component';
import { MaterialModule } from '../shared/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { BusinessService } from './business-profile/business-service';
import { BusinessPaymentComponent } from './business-payment/business-payment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    declarations: [
        BusinessProfileComponent,
        EmployeesComponent,
        BusinessPaymentComponent
    ],
    imports: [MaterialModule, BrowserModule, BrowserAnimationsModule, FlexLayoutModule],
    providers: [BusinessService],
    bootstrap: [],
    exports: []
  })
  export class BusinessProfileModule { }
