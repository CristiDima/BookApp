import { Injectable } from '@angular/core';
import { BookType } from '../models/type.model';

@Injectable()
export class TypeService {
    
    public types: BookType[] = [];
    
    constructor() {
    }

    public get typesName(): string[] {
        const names: string[] = [];
        this.types.forEach(type => {
            names.push(type.name);
        });
        return names;
    }

    public getTypeByName(name: string): BookType {
        let value: BookType = null;
        this.types.forEach(type => {
            if (type.name === name) {
                value = type;
                return;
            }
        });
        return value;
    }

    public getTypeById(id: number): BookType {
        let value: BookType = null;
        this.types.forEach(type => {
            if (type.id === id) {
                value = type;
                return;
            }
        });
        return value;
    }

    public getBooks(author: BookType) {

    }
}