import { AdminComponent } from './actions/admin.component';
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
import { BookActionsComponent } from './book-actions/book-actions.component';
import { UpdateBookComponent } from './book-actions/update-book/update-book.component';
import { AuthorActionsComponent } from './author-actions/author-actions.component';
import { UpdateAuthorComponent } from './author-actions/update-author/update-author.component';
import { GenreActionsComponent } from './type-actions/genre-actions.component';
import { UpdateGenreComponent } from './type-actions/update-genre/update-genre.component';

@NgModule({
    declarations: [
      AdminComponent,
      AddBookComponent,
      AddAuthorComponent,
      AddGenreComponent,
      DeleteBookComponent,
      DeleteAuthorComponent,
      DeleteGenreComponent,
      BookActionsComponent,
      UpdateBookComponent,
      AuthorActionsComponent,
      UpdateAuthorComponent,
      GenreActionsComponent,
      UpdateGenreComponent
    ],
    imports: [MaterialModule,
        BrowserModule
    ],
    providers: [],
    bootstrap: [],
    exports: []
  })
  export class AdminModule { }
