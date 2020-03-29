import { Injectable } from '@angular/core';
import { Author } from '../models/author.model';

@Injectable()
export class AuthorService {
    
    public authors: Author[] = [];
    
    constructor() {
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

    public hasValue (author: Author): boolean {
        if (!author) {
            return false;
        }
        
        if (this.authorsName.includes(author.name)) {
            return true;
        }

        return false;
    }
}