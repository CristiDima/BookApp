import { Component, ViewChild } from '@angular/core';
import { ManagementService } from '../admin-management/management.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ManagementBook } from '../admin-management/management-books.model';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { APIMessagesService } from 'src/app/shared/api-messages.service';
@Component({
  selector: 'app-unreturned-books',
  templateUrl: './unreturned-books.component.html',
  styleUrls: ['./unreturned-books.component.scss']
})
export class UnreturnedBooksComponent {

  public isParentModifiedSubject: Subject<boolean> = new Subject<boolean>();

  constructor(private managementService: ManagementService, private pathRequest: PathRequestService, private apiRequest: APIRequestService,
              private spinner: NgxSpinnerService, private apiMessages: APIMessagesService) {
  }

  public get canShowContent(): boolean {
    return this.managementService.isLoadedInitialData;
  }

  public get managementBooks(): ManagementBook[] {
    return this.managementService.unreturnedBooks;
  }

  public onReturnBookRequest(element: ManagementBook) {
    this.spinner.show();
    this.apiRequest.requst('DELETE', this.pathRequest.returnedPath + '/' + element.bookId,  element.userId)
    .subscribe((responseData: boolean) => {
        if (responseData) {
          const index: number = this.managementService.unreturnedBooks.indexOf(element);
          this.managementService.unreturnedBooks.splice(index, 1);
        }
        this.apiMessages.onReturnedBookMsg(element);
        this.spinner.hide();
        this.isParentModifiedSubject.next(true);
    }, error => {
        this.apiMessages.onReturnedBookMsg(error, true);
        this.spinner.hide();
    });
  }
}
