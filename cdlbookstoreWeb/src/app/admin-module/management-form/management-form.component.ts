import { Component, ViewChild, Input, EventEmitter, Output,
    AfterViewInit, ChangeDetectorRef, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ManagementBook } from '../admin-management/management-books.model';

@Component({
    selector: 'app-management-form',
    templateUrl: './management-form.component.html',
    styleUrls: ['./management-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagementFormComponent implements AfterViewInit, OnChanges {
    @Input() managementBook: ManagementBook[];
    @Input() isFromOrdered: false;
    @Output() parentEvent: EventEmitter<ManagementBook> = new EventEmitter();

    public dataSource: MatTableDataSource<ManagementBook> = null;
    public displayedColumns: string[] = ['clientName', 'bookName', 'address', 'city', 'district', 'email',
                    'phoneNumber', 'returnDate', 'remainingDays', 'returnedBook'];
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(private cdr: ChangeDetectorRef) {
    }

    ngAfterViewInit() {
        this.dataSource = new MatTableDataSource<ManagementBook>(this.managementBook);
        this.dataSource.paginator = this.paginator;
        this.filterPredicate();
        this.cdr.detectChanges();
    }

    ngOnChanges(changes: SimpleChanges) {
        this.dataSource = new MatTableDataSource<ManagementBook>(changes.managementBook.currentValue);
        this.dataSource.paginator = this.paginator;
    }

    public get canShowContent(): boolean {
        return this.managementBook && this.managementBook.length > 0;
    }

    //#region events
    public onParentAction(data: ManagementBook) {
        this.parentEvent.next(data);
    }
    //#endregion

    //#region filter
    public filterPredicate(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate =
          (data: ManagementBook, filtersJson: string) => {
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

    public applyNameFilter(filterValue: string): void {
        const tableFilters = [];
        tableFilters.push({
            id: 'clientName',
            value: filterValue
        });
        this.dataSource.filter = JSON.stringify(tableFilters);
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
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

    public applyCityFilter(filterValue: string): void {
        const tableFilters = [];
        tableFilters.push({
            id: 'city',
            value: filterValue
        });
        this.dataSource.filter = JSON.stringify(tableFilters);
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    public applyDaysFilter(filterValue: string): void {
        const tableFilters = [];
        tableFilters.push({
            id: 'remainingDays',
            value: filterValue
        });
        this.dataSource.filter = JSON.stringify(tableFilters);
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    //#endregion
}
