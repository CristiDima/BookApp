import { Injectable } from '@angular/core';
import { Author } from '../models/author.model';
import { BookService } from './book.service';
import { PathRequestService } from './path-request.service';
import { FileSaveService } from './file-save.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { APIRequestService } from './api-request.service';

@Injectable()
export class AuthorService {
    
    public authors: Author[] = [];
    
    constructor(private _bookService: BookService, private fileService: FileSaveService, private _apiRequest: APIRequestService,
                private _pathRequest: PathRequestService, private spinner: NgxSpinnerService) {
        this.getAuthorsRequest();
    }

    public get authorsName(): string[] {
        const names: string[] = [];
        this.authors.forEach(author => {
            names.push(author.name);
        });
        return names;
    }

    public getAuthorByName(name: string): Author {
        let value: Author = null;
        this.authors.forEach(author => {
            if (author.name === name) {
                value = author;
                return;
            }
        });
        return value;
    }

    public getAuthorById(id: number): Author {
        let value: Author = null;
        this.authors.forEach(author => {
            if (author.id === id) {
                value = author;
                return;
            }
        });
        return value;
    }

    public getBooks(author: Author) {
        
    }

    public isAuthorUsed(author: Author): boolean {
        let isAuthorUsed: boolean = false;
        for (let index = 0; index < this._bookService.books.length; index++) {
            const book = this._bookService.books[index];
            for (let index = 0; index < book.authors.length; index++) {
                const bookAuthor = book.authors[index];
                if (author.name === bookAuthor.name) {
                    isAuthorUsed = true;
                    break;
                }
            }
            if (isAuthorUsed) {
                break;
            }
        }
        return isAuthorUsed;
    }

    public getPhoto (): any {
        this.authors.forEach(author => {
            this.fileService.getAuthorImg(author);
        });
    }

    public hasValue (author: Author): boolean {
        if (!author) {
            return false;
        }
        
        if (this.authorsName.includes(author.name)) {
            return true;
        }

        return false;
    }

    public hasValueByName (authorName: string): boolean {
        if (!authorName) {
            return false;
        }
        
        if (this.authorsName.includes(authorName)) {
            return true;
        }

        return false;
    }

    private getAuthorsRequest() {
        this.spinner.show();
        this._apiRequest.requst('GET', this._pathRequest.authorPath).subscribe((responseData: Author[]) => {
          this.authors = responseData;
        //   this.getPhoto();
          this.spinner.hide();
        }, error => {
          this.spinner.hide();
        });
      }
}