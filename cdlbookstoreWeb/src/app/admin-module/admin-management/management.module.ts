import { MaterialModule } from '../../shared/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ManagementComponent } from './management.component';
import { ManagementService } from './management.service';
import { OrderedBooksComponent } from '../ordered-books/ordered-books.component';
import { ReturnedBooksComponent } from '../returned-books/returned-books.component';
import { ExpiredLoanComponent } from '../expired-loan/expired-loan.component';


@NgModule({
    declarations: [
        ManagementComponent,
        OrderedBooksComponent,
        ReturnedBooksComponent,
        ExpiredLoanComponent
    ],
    imports: [MaterialModule, BrowserModule],
    providers: [ManagementService],
    bootstrap: [],
    exports: []
  })
  export class ManagementModule {

  }
