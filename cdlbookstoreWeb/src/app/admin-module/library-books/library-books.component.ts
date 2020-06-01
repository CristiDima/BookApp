import { Component, ViewChild, Input, EventEmitter, Output,
    AfterViewInit, ChangeDetectorRef, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { element } from 'protractor';

class LibraryBooks {
    public bookName: string;
    public total: number;
    public available: number;
}

@Component({
    selector: 'app-library-books',
    templateUrl: './library-books.component.html',
    styleUrls: ['./library-books.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LibraryBooksComponent {
    public libraryBooks: LibraryBooks[] = [];
    public dataSource: MatTableDataSource<LibraryBooks> = null;
    public displayedColumns: string[] = ['index', 'bookName', 'total', 'available'];
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(private cdr: ChangeDetectorRef, private apiService: APIRequestService, private pathRequest: PathRequestService,
                private spinner: NgxSpinnerService) {
        this.getInitialDataRequest();
    }

    initTable() {
        this.dataSource = new MatTableDataSource<LibraryBooks>(this.libraryBooks);
        this.dataSource.paginator = this.paginator;
        this.filterPredicate();
        this.cdr.detectChanges();
    }

    public get canShowContent(): boolean {
        return this.libraryBooks && this.libraryBooks.length > 0;
    }

    //#region requests
    public getInitialDataRequest() {
        this.spinner.show();
        this.apiService.requst('GET', this.pathRequest.allLibraryPath).subscribe((responseData: Array<any>) => {
            console.log(responseData);
            // tslint:disable-next-line: no-shadowed-variable
            responseData.forEach(element => {
                const tempLibraryBook = new LibraryBooks();
                tempLibraryBook.bookName = element.bookName;
                tempLibraryBook.total = element.total;
                tempLibraryBook.available = element.available;
                this.libraryBooks.push(tempLibraryBook);
            });
            this.initTable();
            this.spinner.hide();
        }, error => {
            this.spinner.hide();
        });
    }
    //#endregion

    //#region filter
    public filterPredicate(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate =
          (data: LibraryBooks, filtersJson: string) => {
              const matchFilter = [];
              const filters = JSON.parse(filtersJson);

              filters.forEach(filter => {
                const val = data[filter.id] === null ? '' : data[filter.id];
                if (!val) {
                  return;
                }
                matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
              });
              return matchFilter.every(Boolean);
        };
    }

    public applyBookNameFilter(filterValue: string): void {
        const tableFilters = [];
        tableFilters.push({
            id: 'bookName',
            value: filterValue
        });
        this.dataSource.filter = JSON.stringify(tableFilters);
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    //#endregion
}
