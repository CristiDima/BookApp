import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserSessionService } from 'src/app/shared/user-session.service';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { UserDetailsService } from 'src/app/shared/user-details.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Employee, BusinessService } from '../business-profile/business-service';



@Component({
  selector: 'app-business-payment',
  templateUrl: './business-payment.component.html',
  styleUrls: ['./business-payment.component.scss']
})
export class BusinessPaymentComponent implements OnInit {

  public employeeControl: FormControl = new FormControl();
  public selectedEmployees: Employee[] = [];
  public filteredEmployee: Observable<Employee[]>;
  private lastEmployeeFilter: string = '';
  
  protected userInfo: FormGroup = null;
  protected isOnEditMode: boolean = false;
  protected addEmployeeForm: FormGroup = null;
  protected hasError: boolean = false;
  protected errorMessage: string = '';

  constructor(private userSessionService: UserSessionService, private apiRequest: APIRequestService, private pathRequest: PathRequestService,
              private spinner: NgxSpinnerService, private toastr: ToastrService, private businessService: BusinessService,
              private userDetailsService: UserDetailsService) {
    this.setFilters();
  }

  ngOnInit() {
    this.addEmployeeForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email])
    });
  }

  //#region events
  public onSubmit() {
    const email = this.addEmployeeForm.value.email;
    this.saveEmployeeRequest(email);
  }
  //#endregion

  //#region Requests
  private saveEmployeeRequest(email: string) {
    this.spinner.show();
    const successMsg: string = 'A employee with email: `' + email + '` was added';
    const errorMsg: string = 'An error occured. Please try again';
    this.apiRequest.requst('POST', this.pathRequest.employeesPath + '/' + this.userSessionService.user.id, email)
    .subscribe((responseData: any) => {
      const tempEmployee: Employee = {email: responseData.email, isSelected: false};
      this.businessService.employees.push(tempEmployee);
      this.spinner.hide();
      this.toastr.success(successMsg);
    }, error => {
      this.spinner.hide();
      this.toastr.error(errorMsg);
    });
  }

  public deleteEmployeesRequest() {
    this.spinner.show();
    const successMsg: string = 'The employees were deleted';
    const errorMsg: string = 'An error occured. Please try again';
    const convMap = {};
    const emails: string[] = [];
    this.selectedEmployees.forEach((val: Employee) => {
      emails.push(val.email);
    });
    convMap['emails'] = emails;
    this.apiRequest.requst('POST', this.pathRequest.employeesPath, convMap)
    .subscribe((responseData: any) => {
      const tempEmployee: Employee = {email: responseData.email, isSelected: false};
      this.selectedEmployees.forEach(employee => {
        const index: number = this.businessService.employees.indexOf(employee);
        this.businessService.employees.splice(index, 1);
        this.setFilters();
      }); 
      this.spinner.hide();
      this.toastr.success(successMsg);
    }, error => {
      this.spinner.hide();
      this.toastr.error(errorMsg);
    });
  }

  //#endregion

  //#region filters
  private filterEmployee(filter: string): Employee[] {
    this.lastEmployeeFilter = filter;
    if (filter) {
      return this.businessService.employees.filter(option => {
        return option.email.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
      })
    } else {
      return this.businessService.employees.slice();
    }
  }

  public displayFn(value: any[] | string): string | undefined {
    let displayValue: string;
    if (Array.isArray(value)) {
      value.forEach((displayVal, index) => {
        if (index === 0) {
          displayValue = displayVal.email;
        } else {
          displayValue += ', ' + displayVal.email;
        }
      });
    } else {
      displayValue = value;
    }
    return displayValue;
  }

  public optionClicked(event: Event, value: Employee): void {
    event.stopPropagation();
    this.toggleEmployeeSelection(value)
  }

  public toggleEmployeeSelection(employee: Employee): void {
    employee.isSelected = !employee.isSelected;
    if (employee.isSelected) {
      this.selectedEmployees.push(employee);
    } else {
      const i = this.selectedEmployees.findIndex(value => value.email === employee.email);
      this.selectedEmployees.splice(i, 1);
    }
    this.employeeControl.setValue(this.selectedEmployees);
  }

  private setFilters(): void {
    this.filteredEmployee = this.employeeControl.valueChanges.pipe(
      startWith<string | Employee[]>(''),
      map(value => typeof value === 'string' ? value : this.lastEmployeeFilter),
      map(filter => this.filterEmployee(filter))
    );
  }
  //#endregion

}
