import { AdminComponent } from './admin.component';
import { AddBookComponent } from './bookActions/add-book/add-book.component';
import { NgModule } from '@angular/core';
import { FooterComponent } from '../footer-component/footer.component';
import { HeaderComponent } from '../header-component/header.component';
import { MaterialModule } from '../shared/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { AddAuthorComponent } from './authorActions/add-author/add-author.component';
import { AddGenreComponent } from './typeActions/add-genre/add-genre.component';
import { DeleteBookComponent } from './bookActions/delete-book/delete-book.component';
import { DeleteAuthorComponent } from './authorActions/delete-author/delete-author.component';
import { DeleteGenreComponent } from './typeActions/delete-genre/delete-genre.component';

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
  