import { Component } from '@angular/core';
import { AuthorService } from '../../shared/author.service';
import { BookService } from '../../shared/book.service';
import { GenreService } from '../../shared/genre.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  constructor(private _authorService: AuthorService, private _bookService: BookService, private _genreService: GenreService) {
  }
}
