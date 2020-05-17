import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './online-file.component.html',
  styleUrls: [ './online-file.component.scss' ]
})
export class OnlineFileComponent  {
    public selectedBook: Book = null;
    public page: number = 2;
    constructor(private router: Router) {
        if (this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.book) {
            this.selectedBook = this.router.getCurrentNavigation().extras.state.book;
        }
    }
}
