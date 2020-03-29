import { Injectable } from '@angular/core';
import { Genre } from '../models/genre.model';

@Injectable()
export class GenreService {
    
    public genres: Genre[] = [];
    
    constructor() {
    }

    public get genresName(): string[] {
        const names: string[] = [];
        this.genres.forEach(genre => {
            names.push(genre.name);
        });
        return names;
    }

    public getGenreByName(name: string): Genre {
        let value: Genre = null;
        this.genres.forEach(genre => {
            if (genre.name === name) {
                value = genre;
                return;
            }
        });
        return value;
    }

    public getGenreById(id: number): Genre {
        let value: Genre = null;
        this.genres.forEach(genre => {
            if (genre.id === id) {
                value = genre;
                return;
            }
        });
        return value;
    }

    public getBooks(genre: Genre) {

    }

    public hasValue (genre: Genre): boolean {
        if (!genre) {
            return false;
        }
        
        if (this.genres.includes(genre)) {
            return true;
        }

        return false;
    }
}