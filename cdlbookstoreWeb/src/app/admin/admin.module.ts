import { AdminComponent } from './admin.component';
import { AddBookComponent } from './bookActions/add-book.component';
import { NgModule } from '@angular/core';
import { FooterComponent } from '../footerComponent/footer.component';
import { HeaderComponent } from '../headerComponent/header.component';
import { MaterialModule } from '../shared/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { AddAuthorComponent } from './authorActions/add-author.component';
import { AddTypeComponent } from './typeActions/add-type.component';
import { DeleteBookComponent } from './bookActions/deleteBook/delete-book.component';
import { DeleteAuthorComponent } from './authorActions/deleteAuthor/delete-author.component';
import { DeleteTypeComponent } from './typeActions/deleteType/delete-type.component';

@NgModule({
    declarations: [
      AdminComponent,
      AddBookComponent,
      AddAuthorComponent,
      AddTypeComponent,
      DeleteBookComponent,
      DeleteAuthorComponent,
      DeleteTypeComponent,
      HeaderComponent,
      FooterComponent,
    ],
    imports: [MaterialModule,
        BrowserModule
    ],
    providers: [],
    bootstrap: [],
    exports: [HeaderComponent,
        FooterComponent]
  })
  export class AdminModule { }
  