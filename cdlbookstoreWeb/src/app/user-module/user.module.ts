
import { NgModule } from '@angular/core';
import { MaterialModule } from '../shared/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { LoannedBooksComponent } from './loanned-books/loanned-books.component';
import { OnlineBooksComponent } from './online-books/online-books.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { LibraryComponent } from './library/library.component';
import { TakeQuizComponent } from './take-quiz/take-quiz.component';
import { BooksFormComponent } from './books-form/books-form.component';
import { OnlineFileComponent } from '../pdf-viewer/online-file.component';
import { BooksComponent } from './books/books.component';
import { BookComponent } from './book/book.component';
import { ProfileModule } from './profile/profile.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { RatingModule } from 'ng-starrating';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    LoannedBooksComponent,
    OnlineBooksComponent,
    WishlistComponent,
    LibraryComponent,
    TakeQuizComponent,
    BooksFormComponent,
    OnlineFileComponent,
    BooksComponent,
    BookComponent,
  ],
  imports: [
    MaterialModule, BrowserModule, ProfileModule,  PdfViewerModule, NgxExtendedPdfViewerModule, RatingModule, FlexLayoutModule
  ],
  entryComponents: [],
  providers: [],
  bootstrap: []
})
export class UserModule { }
