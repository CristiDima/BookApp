import { Component } from '@angular/core';
import { Book } from '../models/book.model';
import { BookService } from '../shared/book.service';
import { interval } from 'rxjs';
import { PagesRouting } from '../shared/pages-routing.service';
import { UserSessionService } from '../shared/user-session.service';
import { AuthenticationService } from '../shared/authentication.service';

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
        // tslint:disable-next-line: max-line-length
        {author: 'George R.R. Martin', quote: '“A reader lives a thousand lives before he dies . . . The man who never reads lives only one.”'},
        {author: 'Ray Bradbury', quote: '“You don’t have to burn books to destroy a culture. Just get people to stop reading them.” '},
        {author: 'Fran Lebowitz', quote: '“Think before you speak. Read before you think.”'},
        // tslint:disable-next-line: max-line-length
        {author: 'Benjamin Franklin', quote: '“The person who deserves most pity is a lonesome one on a rainy day who doesn’t know how to read.” '},
        // tslint:disable-next-line: max-line-length
        {author: 'Carl Sagan', quote: '“One glance at a book and you hear the voice of another person, perhaps someone dead for 1,000 years. To read is to voyage through time.”'},
    ];

    constructor(private bookService: BookService, private pagesRouting: PagesRouting, private authService: AuthenticationService,
                protected userSession: UserSessionService) {
        interval(3000).subscribe(() => {
            if (this.books.length === 0) {
                this.getRandomBooks();
            }
          });
    }

    protected onLogin(): void {
        this.pagesRouting.LoginPage();
    }

    protected onLogout(): void {
        this.authService.logout();
    }

    public onShowDetails(book: Book): void {
        this.pagesRouting.BookPage(book);
    }


    private getRandomBooks(): void {
        if (this.bookService.books.length <= 5) {
            this.books = this.bookService.books;
            return;
        }
        do {
            const randomIndex: number = Math.floor(Math.random() * Math.floor(this.bookService.books.length - 1));
            let isAlreadyAdded = false;
            if (this.books.length > 0) {
                // tslint:disable-next-line: prefer-for-of
                for (let index = 0; index < this.books.length; index++) {
                    const element = this.books[index];
                    if (element.name === this.bookService.books[randomIndex].name) {
                        isAlreadyAdded = true;
                        break;
                    }
                }
            }
            if (!isAlreadyAdded) {
                this.books.push(this.bookService.books[randomIndex]);
            }
        } while (this.books.length < 4);
    }
}
