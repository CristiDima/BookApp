import { Component } from '@angular/core';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

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

    constructor() {}
}