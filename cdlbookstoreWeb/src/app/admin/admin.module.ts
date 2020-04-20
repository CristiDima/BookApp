import { AdminComponent } from './admin.component';
import { AddBookComponent } from './book-actions/add-book/add-book.component';
import { NgModule } from '@angular/core';
import { FooterComponent } from '../footer-component/footer.component';
import { HeaderComponent } from '../header-component/header.component';
import { MaterialModule } from '../shared/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { AddAuthorComponent } from './author-actions/add-author/add-author.component';
import { AddGenreComponent } from './type-actions/add-genre/add-genre.component';
import { DeleteBookComponent } from './book-actions/delete-book/delete-book.component';
import { DeleteAuthorComponent } from './author-actions/delete-author/delete-author.component';
import { DeleteGenreComponent } from './type-actions/delete-genre/delete-genre.component';

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
    exports: [HeaderComponent,  FooterComponent]
  })
  export class AdminModule { }
  