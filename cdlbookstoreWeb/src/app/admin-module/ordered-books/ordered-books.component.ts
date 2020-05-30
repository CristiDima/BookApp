import { Component, ViewChild } from '@angular/core';
import { ManagementService } from '../admin-management/management.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ManagementBook } from '../admin-management/management-books.model';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-ordered-books',
  templateUrl: './ordered-books.component.html',
  styleUrls: ['./ordered-books.component.scss']
})
export class OrderedBooksComponent {
    
    public dataSource: MatTableDataSource<ManagementBook> = null;
    public displayedColumns: string[] = ['clientName', 'bookName', 'address', 'city', 'district', 'email', 'phoneNumber', 'sendedBook'];
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private managementService: ManagementService, private pathRequest: PathRequestService, private apiRequest: APIRequestService,
              private spinner: NgxSpinnerService) {
      this.dataSource = new MatTableDataSource<ManagementBook>(managementService.orderdBooks);
      this.dataSource.paginator = this.paginator;
  }

  public get canShowContent(): boolean {
    return this.managementService.orderdBooks.length > 0;
  }

  public onSendBook(element: ManagementBook) {
    this.spinner.show();
        this.apiRequest.requst('DELETE', this.pathRequest.orderedPath + '/' + element.bookId,  element.userId)
        .subscribe((responseData: boolean) => {
            if (responseData) {
              const index: number = this.managementService.orderdBooks.indexOf(element);
              this.managementService.orderdBooks.splice(index, 1);
            }
            this.spinner.hide();
        }, error => {
            this.spinner.hide();
        });
  }
  
}
