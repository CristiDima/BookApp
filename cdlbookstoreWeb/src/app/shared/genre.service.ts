import { Injectable } from '@angular/core';
import { Genre } from '../models/genre.model';
import { BookService } from './book.service';
import { APIRequestService } from './api-request.service';
import { PathRequestService } from './path-request.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class GenreService {
    
    public genres: Genre[] = [];
    
    constructor(private _bookService: BookService, private _apiRequest: APIRequestService, private _pathRequest: PathRequestService,
                private spinner: NgxSpinnerService) {
        this.getGenresRequest();
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

    public isGenreUsed(genre: Genre): boolean {
        let isGenreUsed: boolean = false;
        for (let index = 0; index < this._bookService.books.length; index++) {
            const book = this._bookService.books[index];
            for (let index = 0; index < book.genres.length; index++) {
                const bookGenre = book.genres[index];
                if (genre.name === bookGenre.name) {
                    isGenreUsed = true;
                    break;
                }
            }
            if (isGenreUsed) {
                break;
            }
        }
        return isGenreUsed;
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

    private getGenresRequest(): void {
        this.spinner.show();
        this._apiRequest.requst('GET', this._pathRequest.genrePath).subscribe((responseData: Genre[]) => {
          this.genres = responseData;
          this.spinner.hide();
        }, error => {
          this.spinner.hide();
        });
      }
}