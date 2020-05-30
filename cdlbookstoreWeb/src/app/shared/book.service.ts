import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { FileSaveService } from './file-save.service';
import { APIRequestService } from './api-request.service';
import { PathRequestService } from './path-request.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { AuthorService } from './author.service';
import { Author } from '../models/author.model';

@Injectable({
    providedIn: 'root',
})
export class BookService {

    public books: Book[] = [];
    public isBooksDownloadedSubject: Subject<boolean> = new Subject<boolean>();

    constructor(private fileService: FileSaveService, private apiRequest: APIRequestService,  private pathRequest: PathRequestService,
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

    public getPhoto(): any {
        this.books.forEach(book => {
            this.fileService.getBookImg(book);
        });
    }

    public getAuthorPhoto(authors: Author[]): void {
        authors.forEach(author => {
            this.fileService.getAuthorImg(author);
        });
    }

    public getFile(): any {
        this.books.forEach(book => {
            this.fileService.getBookPdf(book);
        });
    }

    public getBookFile(book: Book): any {
        this.fileService.getBookPdf(book);
    }

    public getBookPhoto(book: Book): any {
        this.fileService.getBookImg(book);
    }

    public findBookById(id: number): Book {
        return this.books.filter(el => el.id === id)[0];
    }

    public hasValue(book: Book): boolean {
        if (!book) {
            return false;
        }

        if (this.booksName.includes(book.name)) {
            return true;
        }

        return false;
    }

    public hasValueByName(bookName: string): boolean {
        if (!bookName) {
            return false;
        }

        if (this.booksName.includes(bookName)) {
            return true;
        }

        return false;
    }

    public hasQuizByName(quizQuestion: string, book: Book): boolean {
        if (!quizQuestion) {
            return false;
        }

        let hasQuiz = false;

        // tslint:disable-next-line: prefer-for-of
        for (let index = 0; index < book.quiz.length; index++) {
            const element = book.quiz[index];
            if (element.question.toLocaleLowerCase() === quizQuestion.toLocaleLowerCase()) {
                hasQuiz = true;
                break;
            }
        }

        return hasQuiz;
    }

    private getBooksRequest() {
        this.spinner.show();
        this.apiRequest.requst('GET', this.pathRequest.bookPath).subscribe((responseData: Book[]) => {
          this.books = responseData;
          this.books.forEach(book => {
            this.getAuthorPhoto(book.authors);
          });
          this.getPhoto();
          this.getFile();
          this.spinner.hide();
          this.isBooksDownloadedSubject.next();
        }, error => {
          this.spinner.hide();
        });
      }
}
