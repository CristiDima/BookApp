import { Component } from '@angular/core';
import { ManagementService } from '../admin-management/management.service';
import { ManagementBook } from '../admin-management/management-books.model';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { APIMessagesService } from 'src/app/shared/api-messages.service';
@Component({
  selector: 'app-returned-books',
  templateUrl: './returned-books.component.html',
  styleUrls: ['./returned-books.component.scss']
})
export class ReturnedBooksComponent {

  public isParentModifiedSubject: Subject<boolean> = new Subject<boolean>();

  constructor(private managementService: ManagementService, private pathRequest: PathRequestService, private apiRequest: APIRequestService,
              private spinner: NgxSpinnerService, private apiMessages: APIMessagesService) {
  }

  public get canShowContent(): boolean {
    return this.managementService.isLoadedInitialData;
  }

  public get managementBooks(): ManagementBook[] {
    return this.managementService.returnedBooks;
  }


  public onReturnBookRequest(element: ManagementBook) {
    this.spinner.show();
    this.apiRequest.requst('DELETE', this.pathRequest.returnedPath + '/' + element.bookId,  element.userId)
    .subscribe((responseData: boolean) => {
        if (responseData) {
          const index: number = this.managementService.returnedBooks.indexOf(element);
          this.managementService.returnedBooks.splice(index, 1);
        }
        this.isParentModifiedSubject.next(true);
        this.apiMessages.onReturnedBookMsg(element);
        this.spinner.hide();
    }, error => {
        this.apiMessages.onReturnedBookMsg(error, true);
        this.spinner.hide();
    });
  }
}
