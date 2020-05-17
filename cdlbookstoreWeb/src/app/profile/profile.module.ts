import { NgModule } from '@angular/core';
import { MaterialModule } from '../shared/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { DetailsComponent } from './details/details.component';
import { LoannedBooksComponent } from './loanned-books/loanned-books.component';
import { OnlineBooksComponent } from './online-books/online-books.component';
import { PaymentComponent } from './payment/payment.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { AdminModule } from '../admin/admin.module';
import { ProfileComponent } from './profile.component';
import { LibraryComponent } from './library/library.component';

@NgModule({
    declarations: [
      ProfileComponent,
      DetailsComponent,
      LoannedBooksComponent,
      OnlineBooksComponent,
      PaymentComponent,
      WishlistComponent,
      LibraryComponent
    ],
    imports: [MaterialModule, BrowserModule, AdminModule],
    providers: [],
    bootstrap: [],
    exports: []
  })
  export class ProfileModule { }
  