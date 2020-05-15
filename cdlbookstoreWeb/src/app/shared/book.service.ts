import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { FileSaveService } from './file-save.service';
import { APIRequestService } from './api-request.service';
import { PathRequestService } from './path-request.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class BookService {
    
    public books: Book[] = [];
    public isBooksDownloadedSubject: Subject<boolean> = new Subject<boolean>();
    
    constructor(private fileService: FileSaveService, private _apiRequest: APIRequestService,  private _pathRequest: PathRequestService,
                private spinner: NgxSpinnerService) {
        this.getBooksRequest();
    }

    public get booksName(): string[] {
        const names: string[] = [];
        this.books.forEach(book => {
            names.push(book.name);
        });
        return names;
    }

    public getBookByName(name: string): Book {
        let value: Book = null;
        this.books.forEach(book => {
            if (book.name === name) {
                value = book;
                return;
            }
        });
        return value;
    }

    public getBookById(id: number): Book {
        let value: Book = null;
        this.books.forEach(book => {
            if (book.id === id) {
                value = book;
                return;
            }
        });
        return value;
    }

    public searchBooksByBooksName(booksName: string[]): Book[] {
        const matchedBooks: Book[] = [];
        booksName.forEach(el => {
            this.books.forEach(book => {
                if (book.name === el) {
                    matchedBooks.push(book);
                }
            })
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

    public getPhoto (): any {
        this.books.forEach(book => {
            this.fileService.getBookImg(book);
        });
    }

    public getFile (): any {
        this.books.forEach(book => {
            this.fileService.getBookPdf(book);
        });
    }

    public hasValue (book: Book): boolean {
        if (!book) {
            return false;
        }
        
        if (this.booksName.includes(book.name)) {
            return true;
        }

        return false;
    }

    private getBooksRequest() {
        this.spinner.show();
        this._apiRequest.requst('GET', this._pathRequest.bookPath).subscribe((responseData: Book[]) => {
          this.books = responseData;
          this.getPhoto();
          this.getFile();
          this.spinner.hide();
          this.isBooksDownloadedSubject.next();
        }, error => {
          this.spinner.hide();
        });
      }
}