import { Component } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { Author } from 'src/app/models/author.model';
import { Genre } from 'src/app/models/genre.model';
import { BookService } from 'src/app/shared/book.service';
import { AuthorService } from 'src/app/shared/author.service';
import { GenreService } from 'src/app/shared/genre.service';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';

export enum SearchValues {
  Author = 'Author',
  Book = 'Book',
  Genre = 'Genre'
}

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent {


  public selectedBook: Book = null;
  public areBooksDownloaded = false;

  constructor(private bookService: BookService, private authorService: AuthorService, private genreService: GenreService) {
    this.bookService.isBooksDownloadedSubject.subscribe(el => {
      this.areBooksDownloaded = true;
    });
  }

  public canShowContent(): boolean {
    if (!this.books && this.books.length === 0) {
      return false;
    } else if (!this.authors && this.authors.length === 0) {
      return false;
    } else if (!this.genres && this.genres.length === 0) {
      return false;
    }

    return true;
  }

  public get books(): Book[] {
    return this.bookService.books;
  }

  public get authors(): Author[] {
    return this.authorService.authors;
  }

  public get genres(): Genre[] {
    return this.genreService.genres;
  }
  //#endregion
}
