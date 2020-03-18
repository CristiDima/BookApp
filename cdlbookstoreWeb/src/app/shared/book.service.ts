import { Injectable } from '@angular/core';
import { Author } from '../models/author.model';
import { Book } from '../models/book.model';

@Injectable()
export class BookService {
    
    public books: Book[] = [];
    
    constructor() {
    }

    public get booksName(): string[] {
        const names: string[] = [];
        this.books.forEach(book => {
            names.push(book.name);
        });
        return names;
    }

    public getBookByName(name: string): Author {
        let value: Author = null;
        this.books.forEach(book => {
            if (book.name === name) {
                value = book;
                return;
            }
        });
        return value;
    }

    public getBookById(id: number): Author {
        let value: Author = null;
        this.books.forEach(book => {
            if (book.id === id) {
                value = book;
                return;
            }
        });
        return value;
    }

    public getAuthor(book: Book){

    }
}