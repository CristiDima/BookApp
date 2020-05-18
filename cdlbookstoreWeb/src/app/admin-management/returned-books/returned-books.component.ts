import { Component, ViewChild } from '@angular/core';
import { ManagementService } from '../management.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ManagementBook } from '../management-books.model';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-returned-books',
  templateUrl: './returned-books.component.html',
  styleUrls: ['./returned-books.component.scss']
})
export class ReturnedBooksComponent {
    
    public dataSource: MatTableDataSource<ManagementBook> = null;
    public displayedColumns: string[] = ['clientName', 'bookName', 'address', 'city', 'district', 'email',
                    'phoneNumber', 'returnDate', 'returnedBook'];
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private managementService: ManagementService, private pathRequest: PathRequestService, private apiRequest: APIRequestService,
              private spinner: NgxSpinnerService) {
      this.dataSource = new MatTableDataSource<ManagementBook>(managementService.returnedBooks);
      this.dataSource.paginator = this.paginator;
  }

  public get canShowContent(): boolean {
    return this.managementService.returnedBooks.length > 0;
  }

  public getDataFormat(date: Date): any {
      if (date instanceof Date) {
        return date.toUTCString();
      }
      return date;
  }

  public onReturnBook(element: ManagementBook) {
    this.spinner.show();
        this.apiRequest.requst('DELETE', this.pathRequest.returnedPath + '/' + element.bookId,  element.userId)
        .subscribe((responseData: boolean) => {
            if (responseData) {
              const index: number = this.managementService.returnedBooks.indexOf(element);
              this.managementService.returnedBooks.splice(index, 1);
            }
            this.spinner.hide();
        }, error => {
            this.spinner.hide();
        });
  }
  
}
