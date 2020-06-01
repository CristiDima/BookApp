import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserSessionService } from 'src/app/shared/user-session.service';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { UserDetailsService } from 'src/app/shared/user-details.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Employee, BusinessService } from '../business-profile/business-service';
import { APIMessagesService } from 'src/app/shared/api-messages.service';

@Component({
  selector: 'app-business-payment',
  templateUrl: './business-payment.component.html',
  styleUrls: ['./business-payment.component.scss']
})
export class BusinessPaymentComponent implements OnInit {

  public employeeControl: FormControl = new FormControl();
  public selectedEmployees: Employee[] = [];
  public filteredEmployee: Observable<Employee[]>;
  private lastEmployeeFilter = '';

  protected userInfo: FormGroup = null;
  protected isOnEditMode = false;
  protected addEmployeeForm: FormGroup = null;
  protected hasError = false;
  protected errorMessage = '';

  constructor(private userSessionService: UserSessionService, private apiRequest: APIRequestService,
              private pathRequest: PathRequestService, private spinner: NgxSpinnerService, private apiMessage: APIMessagesService,
              private businessService: BusinessService, private userDetailsService: UserDetailsService) {
    this.setFilters();
  }

  ngOnInit() {
    this.addEmployeeForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  public get isBusinessSubscription(): boolean {
    return this.userDetailsService.isBusinessSubscription;
  }

  public get employeesLength(): number {
    return this.businessService.employees.length;
  }

  public get canShowContent(): boolean {
    return this.businessService.canShowContent;
  }

  //#region events
  public onSubmit() {
    const email = this.addEmployeeForm.value.email;
    this.saveEmployeeRequest(email);
  }

  public onActivateSubscription() {
    this.businessService.activateBusinessRequest();
  }
  //#endregion

  //#region Requests
  private saveEmployeeRequest(email: string) {
    this.spinner.show();
    this.apiRequest.requst('POST', this.pathRequest.employeesPath + '/' + this.userSessionService.user.id, email)
    .subscribe((responseData: any) => {
      const tempEmployee: Employee = {email: responseData.email, isSelected: false};
      this.businessService.employees.push(tempEmployee);
      this.spinner.hide();
      this.apiMessage.onAddEmployeeMsg(email);
    }, error => {
      this.spinner.hide();
      this.apiMessage.onAddEmployeeMsg(error, true);
    });
  }

  public deleteEmployeesRequest() {
    this.spinner.show();
    const convMap = {};
    const emails: string[] = [];
    this.selectedEmployees.forEach((val: Employee) => {
      emails.push(val.email);
    });
    // tslint:disable-next-line: no-string-literal
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
      if (emails.length > 1) {
        this.apiMessage.onDeleteEmployeesMsg(emails.length);
      } else {
        this.apiMessage.onDeleteEmployeesMsg(emails[0]);
      }
    }, error => {
      this.spinner.hide();
      this.apiMessage.onDeleteEmployeesMsg(error.true);
    });
  }

  //#endregion

  //#region filters
  private filterEmployee(filter: string): Employee[] {
    this.lastEmployeeFilter = filter;
    if (filter) {
      return this.businessService.employees.filter(option => {
        return option.email.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
      });
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
    this.toggleEmployeeSelection(value);
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
