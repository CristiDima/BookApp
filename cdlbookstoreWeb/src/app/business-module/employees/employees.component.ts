import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BusinessService, Employee } from '../business-profile/business-service';
import { ToastrService } from 'ngx-toastr';
import { UserSessionService } from 'src/app/shared/user-session.service';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent {

    public dataSource: MatTableDataSource<Employee> = null;
    public displayedColumns: string[] = ['name', 'email'];
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private businessService: BusinessService) {
      this.businessService.getAllEmployeesRequest();
      this.businessService.isDownloadedSubject.subscribe(el => {
        this.setInitData();
      });
  }

  public get canShowContent(): boolean {
    return this.businessService.employees.length > 0;
  }

  public get contentLength(): number {
    return this.businessService.employees.length;
  }

  private setInitData(): void {
    this.dataSource = new MatTableDataSource<Employee>(this.businessService.employees);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate =
      (data: Employee, filtersJson: string) => {
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

  //#region filter
  applyFilter(filterValue: string) {
    const tableFilters = [];
    tableFilters.push({
      id: 'email',
      value: filterValue
    });
    this.dataSource.filter = JSON.stringify(tableFilters);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //#endregion
}
