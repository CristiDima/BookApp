import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DetailsComponent } from './details/details.component';
import { PaymentComponent } from './payment/payment.component';
import { ProfileComponent } from './profile.component';
import { MaterialModule } from 'src/app/shared/material.module';

@NgModule({
    declarations: [
      ProfileComponent,
      DetailsComponent,
      PaymentComponent
    ],
    imports: [MaterialModule, BrowserModule],
    providers: [],
    bootstrap: [],
    exports: []
  })
  export class ProfileModule { }
