import { Component } from '@angular/core';
import { Book } from '../models/book.model';
import { BookService } from '../shared/book.service';
import { interval } from 'rxjs';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

    public books: Book[] = [];

    public imageUrlArray = [
        { url: 'assets/img/book1.jpg' },
        { url: 'assets/img/book2.jpg' },
        { url: 'assets/img/book3.jpg' },
        { url: 'assets/img/book4.jpg' },
        { url: 'assets/img/book5.jpg' }
      ];

    public famousQuotes = [
        {author:'George R.R. Martin', quote:'“A reader lives a thousand lives before he dies . . . The man who never reads lives only one.”'},
        {author:'Ray Bradbury', quote:'“You don’t have to burn books to destroy a culture. Just get people to stop reading them.” '},
        {author:'Fran Lebowitz', quote:'“Think before you speak. Read before you think.”'},
        {author:'Benjamin Franklin', quote:'“The person who deserves most pity is a lonesome one on a rainy day who doesn’t know how to read.” '},
        {author:'Carl Sagan', quote:'“One glance at a book and you hear the voice of another person, perhaps someone dead for 1,000 years. To read is to voyage through time.”'},
    ];

    constructor(private _bookService: BookService) {
        interval(100).subscribe(() => { // will execute every 30 seconds
            if (this.books.length === 0) {
                this.getRandomBooks();
            }
          });
    }

    private getRandomBooks(): void {
        if (this._bookService.books.length <= 5) {
            this.books = this._bookService.books;
            return;
        }
        do {
            const randomIndex: number = Math.floor(Math.random() * Math.floor(this._bookService.books.length - 1));
            let isAlreadyAdded: boolean = false;
            if (this.books.length > 0) {
                for (let index = 0; index < this.books.length; index++) {
                    const element = this.books[index];
                    if (element.name === this._bookService.books[randomIndex].name) {
                        isAlreadyAdded = true;
                        break;
                    }
                }
            }
            if (!isAlreadyAdded) {
                this.books.push(this._bookService.books[randomIndex]);
            }
        } while (this.books.length < 4)
    }
}