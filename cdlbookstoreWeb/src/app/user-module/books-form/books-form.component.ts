import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Book } from 'src/app/models/book.model';
import { Author } from 'src/app/models/author.model';
import { Genre } from 'src/app/models/genre.model';
import { BookService } from 'src/app/shared/book.service';
import { PagesRouting } from 'src/app/shared/pages-routing.service';
import { UserDetailsService } from 'src/app/shared/user-details.service';

export enum SearchValues {
  Autor = 'Author',
  Carte = 'Book',
  Gen = 'Genre'
}

@Component({
  selector: 'app-books-form',
  templateUrl: './books-form.component.html',
  styleUrls: ['./books-form.component.scss']
})
export class BooksFormComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @Input() books: Book[];
  @Input() authors: Author[];
  @Input() genres: Genre[];
  @Input() isLoanedPage = false;
  @Input() isEBookPage = false;
  @Output() parentEvent: EventEmitter<Book> = new EventEmitter();

  public dataSource: MatTableDataSource<Book> = null;
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
  private lastBookFilter = '';
  private lastAuthorFilter = '';
  private lastGenreFilter = '';
  public searchByValue = SearchValues;
  public selected: any = null;

  public uiBooks: Book[] = null;
  public selectedBook: Book = null;

  constructor(private cdr: ChangeDetectorRef, private pagesRouting: PagesRouting, private bookService: BookService,
              private userDetailsService: UserDetailsService) {
    this.bookService.isBooksDownloadedSubject.subscribe(el => {
      this.onClear();
    });
    this.userDetailsService.isBooksDownloadedSubject.subscribe(el => {
      this.onClear();
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

  public getAuthorImage(book: Book): File {
    return book.authors[0].uiImage;
  }

  public get isSearchByBooksDisable(): boolean {
    if (_.isNil(this.selected)) {
      return true;
    }

    return this.selected.value !== SearchValues.Carte;
  }

  public get isSearchByAuthorsDisable(): boolean {
    if (_.isNil(this.selected)) {
      return true;
    }

    return this.selected.value !== SearchValues.Autor;
  }

  public get isSearchByGenresDisable(): boolean {
    if (_.isNil(this.selected)) {
      return true;
    }

    return this.selected.value !== SearchValues.Gen;
  }

  public get canShowContent(): boolean {
    if (!this.books || _.isNil(this.obs) || _.isNil(this.dataSource)) {
      return false;
    }
    return true;
  }

  private instantiateNavigator() {
    if (this.uiBooks === null) {
      this.uiBooks = this.books;
    }
    this.dataSource = new MatTableDataSource<Book>(this.uiBooks);
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
  }

  public isLoanedBook(book: Book): boolean {
    if (this.isLoanedPage) {
      return false;
    }

    const loanedBook: Book = this.userDetailsService.loanedBooks.filter(el => el.id === book.id)[0];
    if (loanedBook) {
      return true;
    }

    return false;
  }

  //#region event
  public onSearch(): void {
    if (this.selected.value === SearchValues.Gen) {
      const selectedGenresName: string[] = [];
      this.selectedGenres.forEach(el => {
        selectedGenresName.push(el.name);
      });
      this.uiBooks = this.searchBooksByGenresName(selectedGenresName);
    } else if (this.selected.value === SearchValues.Carte) {
      const selectedBooksName: string[] = [];
      this.selectedBooks.forEach(el => {
        selectedBooksName.push(el.name);
      });
      this.uiBooks = this.searchBooksByBooksName(selectedBooksName);
    } else if (this.selected.value === SearchValues.Autor) {
      const selectedAuthorsName: string[] = [];
      this.selectedAuthors.forEach(el => {
        selectedAuthorsName.push(el.name);
      });
      this.uiBooks = this.searchBooksByAuthorsName(selectedAuthorsName);
    }
    this.instantiateNavigator();
  }

  public getBookFile(book: Book) {
    this.bookService.getBookFile(book);
  }

  public searchBooksByBooksName(booksName: string[]): Book[] {
    const matchedBooks: Book[] = [];
    booksName.forEach(el => {
        this.books.forEach(book => {
            if (book.name === el) {
                matchedBooks.push(book);
            }
        });
    });
    return matchedBooks;
  }

  public searchBooksByAuthorsName(authorsName: string[]): Book[] {
      const matchedBooks: Book[] = [];
      authorsName.forEach(el => {
          this.books.forEach(book => {
              book.authors.forEach(author => {
                  if (author.name === el) {
                      matchedBooks.push(book);
                  }
              });
          });
      });
      return matchedBooks;
  }

  public searchBooksByGenresName(genresName: string[]): Book[] {
      const matchedBooks: Book[] = [];
      genresName.forEach(el => {
          this.books.forEach(book => {
              book.genres.forEach(genre => {
                  if (genre.name === el) {
                      matchedBooks.push(book);
                  }
              });
          });
      });
      return matchedBooks;
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
    this.uiBooks = this.books;
    this.setFilters();
    this.instantiateNavigator();
  }

  public onShowBookDetails(book: Book): void {
    this.pagesRouting.BookPage(book);
  }

  public onDoParentAction(book: Book): void {
    this.parentEvent.emit(book);
  }

  public onReadBook(book: Book): void {
      this.pagesRouting.PdfViewerPage(book);
  }
  //#endregion

  //#region filters
  private filterBook(filter: string): Book[] {
    if (!this.uiBooks) {
      return;
    }
    this.lastBookFilter = filter;
    if (filter) {
      return this.uiBooks.filter(option => {
        return option.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
      });
    } else {
      return this.uiBooks.slice();
    }
  }

  private filterAuthor(filter: string): Author[] {
    if (!this.authors) {
      return;
    }
    this.lastAuthorFilter = filter;
    if (filter) {
      return this.authors.filter(option => {
        return option.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
      });
    } else {
      return this.authors.slice();
    }
  }

  private filterGenre(filter: string): Genre[] {
    if (!this.genres) {
      return;
    }
    this.lastGenreFilter = filter;
    if (filter) {
      return this.genres.filter(option => {
        return option.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
      });
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
    this.cdr.markForCheck();
  }
  //#endregion
}
