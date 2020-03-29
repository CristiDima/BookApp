import { AdminComponent } from './admin.component';
import { AddBookComponent } from './bookActions/addBook/add-book.component';
import { NgModule } from '@angular/core';
import { FooterComponent } from '../footerComponent/footer.component';
import { HeaderComponent } from '../headerComponent/header.component';
import { MaterialModule } from '../shared/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { AddAuthorComponent } from './authorActions/addAuthor/add-author.component';
import { AddGenreComponent } from './typeActions/addGenre/add-genre.component';
import { DeleteBookComponent } from './bookActions/deleteBook/delete-book.component';
import { DeleteAuthorComponent } from './authorActions/deleteAuthor/delete-author.component';
import { DeleteGenreComponent } from './typeActions/deleteGenre/delete-genre.component';

@NgModule({
    declarations: [
      AdminComponent,
      AddBookComponent,
      AddAuthorComponent,
      AddGenreComponent,
      DeleteBookComponent,
      DeleteAuthorComponent,
      DeleteGenreComponent,
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
  