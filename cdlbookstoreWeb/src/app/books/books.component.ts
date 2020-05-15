import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy, OnChanges, AfterContentInit, AfterViewInit } from '@angular/core';
import { BookService } from '../shared/book.service';
import { AuthorService } from '../shared/author.service';
import { GenreService } from '../shared/genre.service';
import { Book } from '../models/book.model';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs';
import * as _ from "lodash";
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Author } from '../models/author.model';
import { Genre } from '../models/genre.model';
import { PagesRouting } from '../shared/pages-routing.service';

export enum SearchValues {
  Author = "Author",
  Book = "Book",
  Genre = "Genre"
}

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  public dataSource: MatTableDataSource<Book> = null
  public obs: Observable<any>;
  public bookControl: FormControl = new FormControl();
  public authorControl: FormControl = new FormControl();
  public genreControl: FormControl = new FormControl();
  public selectedAuthors: Author[] = [];
  public selectedBooks: Book[] = [];
  public selectedGenres: Genre[] = [];
  public filteredBooks: Observable<Book[]>;
  public filteredAuthors: Observable<Author[]>;
  public filteredGenres: Observable<Genre[]>;
  private lastBookFilter: string = '';
  private lastAuthorFilter: string = '';
  private lastGenreFilter: string = '';
  public searchByValue = SearchValues;
  public selected: any = null;

  private _uiBooks: Book[] = null;
  public selectedBook: Book = null;

  constructor(private _bookService: BookService, private _authorService: AuthorService, private _genreService: GenreService,
              private cdr: ChangeDetectorRef, private _pagesRouting: PagesRouting) {
    this._bookService.isBooksDownloadedSubject.asObservable().subscribe(() => {
      if (this.books.length > 0) {
        this.instantiateNavigator();
      }
    });
  }

  ngOnInit() {
    this.setFilters();
  }

  ngAfterViewInit() {
      this.instantiateNavigator();
      this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.dataSource.disconnect();
  }

  public get isSearchByBooksDisable(): boolean {
    if (_.isNil(this.selected)) {
      return true;
    }

    return this.selected.value !== SearchValues.Book;
  }

  public get isSearchByAuthorsDisable(): boolean {
    if (_.isNil(this.selected)) {
      return true;
    }

    return this.selected.value !== SearchValues.Author;
  }

  public get isSearchByGenresDisable(): boolean {
    if (_.isNil(this.selected)) {
      return true;
    }

    return this.selected.value !== SearchValues.Genre;
  }

  public get canShowContent(): boolean {
    if (_.isNil(this.obs) || this.books.length === 0 || _.isNil(this.dataSource)) {
      return false;
    } 
    return true;
  }

  public get uiBoooks(): Book[] {
    if (!this._uiBooks && this.books.length > 0) {
      this._uiBooks = this.books;
    }

    return this._uiBooks;
  }

  public get books(): Book[] {
    return this._bookService.books;
  }

  private get authors(): Author[] {
    return this._authorService.authors;
  }

  private get genres(): Genre[] {
    return this._genreService.genres;
  }

  private instantiateNavigator() {
    this.dataSource = new MatTableDataSource<Book>(this.uiBoooks);
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
  }

  //#region event
  public onSearch(): void {
    if (this.selected.value === SearchValues.Genre) {
      const selectedGenresName: string[] = [];
      this.selectedGenres.forEach(el => {
        selectedGenresName.push(el.name);
      });
      this._uiBooks = this._bookService.searchBooksByGenresName(selectedGenresName);
    } else if (this.selected.value === SearchValues.Book) {
      const selectedBooksName: string[] = [];
      this.selectedBooks.forEach(el => {
        selectedBooksName.push(el.name);
      });
      this._uiBooks = this._bookService.searchBooksByBooksName(selectedBooksName);
    } else if (this.selected.value === SearchValues.Author) {
      const selectedAuthorsName: string[] = [];
      this.selectedAuthors.forEach(el => {
        selectedAuthorsName.push(el.name);
      });
      this._uiBooks = this._bookService.searchBooksByAuthorsName(selectedAuthorsName);
    }
    this.instantiateNavigator();
  }

  public onClear(): void {
    this.bookControl = new FormControl();
    this.authorControl = new FormControl();
    this.genreControl = new FormControl();
    this.lastBookFilter = '';
    this.lastAuthorFilter = '';
    this.lastGenreFilter = '';
    this.selectedBooks.forEach(el => {
      el.uiSelected = false;
    });
    this.selectedAuthors.forEach(el => {
      el.uiSelected = false;
    });
    this.selectedGenres.forEach(el => {
      el.uiSelected = false;
    });
    this.setFilters();
    this._uiBooks = this.books;
    this.instantiateNavigator();
  }

  public onShowBookDetails(book: Book) {
    this._pagesRouting.BookPage(book);
  }
  //#endregion

  //#region filters
  private filterBook(filter: string): Book[] {
    this.lastBookFilter = filter;
    if (filter) {
      return this.books.filter(option => {
        return option.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
      })
    } else {
      return this.books.slice();
    }
  }

  private filterAuthor(filter: string): Author[] {
    this.lastAuthorFilter = filter;
    if (filter) {
      return this.authors.filter(option => {
        return option.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
      })
    } else {
      return this.authors.slice();
    }
  }

  private filterGenre(filter: string): Genre[] {
    this.lastGenreFilter = filter;
    if (filter) {
      return this.genres.filter(option => {
        return option.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
      })
    } else {
      return this.genres.slice();
    }
  }

  public displayFn(value: any[] | string): string | undefined {
    let displayValue: string;
    if (Array.isArray(value)) {
      value.forEach((displayVal, index) => {
        if (index === 0) {
          displayValue = displayVal.name;
        } else {
          displayValue += ', ' + displayVal.name;
        }
      });
    } else {
      displayValue = value;
    }
    return displayValue;
  }

  public optionClicked(event: Event, value: Book | Author | Genre): void {
    event.stopPropagation();
    if (value instanceof Book) {
      this.toggleBookSelection(value);
    } else if (value instanceof Author) {
      this.toggleAuthorSelection(value);
    } else if (value instanceof Genre) {
      this.toggleGenreSelection(value);
    }
  }

  public toggleBookSelection(book: Book): void {
    book.uiSelected = !book.uiSelected;
    if (book.uiSelected) {
      this.selectedBooks.push(book);
    } else {
      const i = this.selectedBooks.findIndex(value => value.name === book.name);
      this.selectedBooks.splice(i, 1);
    }
    console.log(this.selectedBooks);
    this.bookControl.setValue(this.selectedBooks);
  }

  public toggleAuthorSelection(author: Author): void {
    author.uiSelected = !author.uiSelected;
    if (author.uiSelected) {
      this.selectedAuthors.push(author);
    } else {
      const i = this.selectedAuthors.findIndex(value => value.name === author.name);
      this.selectedAuthors.splice(i, 1);
    }

    this.authorControl.setValue(this.selectedAuthors);
  }

  public toggleGenreSelection(genre: Genre): void {
    genre.uiSelected = !genre.uiSelected;
    if (genre.uiSelected) {
      this.selectedGenres.push(genre);
    } else {
      const i = this.selectedGenres.findIndex(value => value.name === genre.name);
      this.selectedGenres.splice(i, 1);
    }

    this.genreControl.setValue(this.selectedGenres);
  }

  private setFilters(): void {
    this.filteredBooks = this.bookControl.valueChanges.pipe(
      startWith<string | Book[]>(''),
      map(value => typeof value === 'string' ? value : this.lastBookFilter),
      map(filter => this.filterBook(filter))
    );
    this.filteredAuthors = this.authorControl.valueChanges.pipe(
      startWith<string | Author[]>(''),
      map(value => typeof value === 'string' ? value : this.lastAuthorFilter),
      map(filter => this.filterAuthor(filter))
    );
    this.filteredGenres = this.genreControl.valueChanges.pipe(
      startWith<string | Genre[]>(''),
      map(value => typeof value === 'string' ? value : this.lastGenreFilter),
      map(filter => this.filterGenre(filter))
    );
  }
  //#endregion
}
