import { MaterialModule } from '../../shared/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ManagementComponent } from './management.component';
import { ManagementService } from './management.service';
import { OrderedBooksComponent } from '../ordered-books/ordered-books.component';
import { ReturnedBooksComponent } from '../returned-books/returned-books.component';
import { UnreturnedBooksComponent } from '../unreturned-books/unreturned-books.component';
import { ManagementFormComponent } from '../management-form/management-form.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LibraryBooksComponent } from '../library-books/library-books.component';


@NgModule({
    declarations: [
        ManagementComponent,
        OrderedBooksComponent,
        ReturnedBooksComponent,
        UnreturnedBooksComponent,
        ManagementFormComponent,
        LibraryBooksComponent
    ],
    imports: [MaterialModule, BrowserModule, FlexLayoutModule],
    providers: [ManagementService],
    bootstrap: [],
    exports: []
  })
  export class ManagementModule {

  }
