import { Component} from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { UserDetailsService } from 'src/app/shared/user-details.service';
import * as _ from 'lodash';
import { PagesRouting } from 'src/app/shared/pages-routing.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { UserSessionService } from 'src/app/shared/user-session.service';
import { APIMessagesService } from 'src/app/shared/api-messages.service';
import { AuthorService } from 'src/app/shared/author.service';
import { GenreService } from 'src/app/shared/genre.service';
import { Author } from 'src/app/models/author.model';
import { Genre } from 'src/app/models/genre.model';

@Component({
  selector: 'app-online-books',
  templateUrl: './online-books.component.html',
  styleUrls: ['./online-books.component.scss']
})
export class OnlineBooksComponent {

  constructor(private userDetailsService: UserDetailsService, private pagesRouting: PagesRouting, private apiRequest: APIRequestService,
              private pathRequest: PathRequestService, private spinner: NgxSpinnerService, private userSesion: UserSessionService,
              private apiMessage: APIMessagesService, private authorService: AuthorService, private genreService: GenreService) {

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
    return this.userDetailsService.onlineBooks;
  }

   //#region events
  public onReadBook(book: Book): void {
    this.pagesRouting.PdfViewerPage(book);
  }
  //#endregion

   //#region requests
   public deleteFromOnlineRequest(book: Book) {
    this.spinner.show();
    this.apiRequest.requst('DELETE', this.pathRequest.onlinePath + '/' + book.id, this.userSesion.user.id)
    .subscribe((responseData: Book) => {
        const index: number = this.userDetailsService.onlineBooks.indexOf(responseData);
        this.userDetailsService.onlineBooks.splice(index, 1);
        this.apiMessage.onDeleteFromEBookMsg(book);
        this.spinner.hide();
    }, error => {
        this.apiMessage.onDeleteFromEBookMsg(error, true);
        this.spinner.hide();
    });
  }
  //#endregion

}
