import { NgModule } from '@angular/core';
import { MaterialModule } from '../shared/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from '../admin/admin.module';
import { BusinessProfileComponent } from './business-profile.component';
import { BusinessPaymentComponent } from './business-payment/business-payment.component';
import { BusinessService } from './business-service';

@NgModule({
    declarations: [
        BusinessProfileComponent,
        BusinessPaymentComponent
    ],
    imports: [MaterialModule, BrowserModule, AdminModule],
    providers: [BusinessService],
    bootstrap: [],
    exports: []
  })
  export class BusinessProfileModule { }
  