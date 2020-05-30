import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Book } from 'src/app/models/book.model';
import { Observable } from 'rxjs';
import { UserDetailsService } from 'src/app/shared/user-details.service';
import * as _ from 'lodash';
import { AuthorService } from 'src/app/shared/author.service';
import { GenreService } from 'src/app/shared/genre.service';
import { Author } from 'src/app/models/author.model';
import { Genre } from 'src/app/models/genre.model';
@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  public dataSource: MatTableDataSource<Book> = null;
  public obs: Observable<any>;

  constructor(private userDetailsService: UserDetailsService, private authorService: AuthorService, private genreService: GenreService) {

  }


  public canShowContent(): boolean {
    if (!this.books && this.books.length === 0) {
      return false;
    } else if (!this.authors && this.authors.length === 0) {
      return false;
    } else if (!this.genres && this.genres.length === 0) {
      return false;
    }

    return true;
  }

  public get authors(): Author[] {
    return this.authorService.authors;
  }

  public get genres(): Genre[] {
    return this.genreService.genres;
  }

  public get books(): Book[] {
    return this.userDetailsService.library;
  }
}
