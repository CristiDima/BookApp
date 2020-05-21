import { Injectable } from '@angular/core';
import { UserSessionService } from '../shared/user-session.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { APIRequestService } from '../shared/api-request.service';
import { PathRequestService } from '../shared/path-request.service';
import { UserDetailsService } from '../shared/user-details.service';
import { UserBusinessSubscription } from '../models/user.model';

export interface Employee {
    email: string;
    isSelected: boolean;
  }

@Injectable({
    providedIn: 'root',
})
export class BusinessService { 

    public employees: Employee[] = [];
    public canShowContent: boolean = false;

    constructor(private userSessionService: UserSessionService, private apiRequest: APIRequestService, private pathRequest: PathRequestService,
                private spinner: NgxSpinnerService, private userDetailsService: UserDetailsService, private toastr: ToastrService) {

    }

    public getAllEmployeesRequest() { 
      this.spinner.show();
        this.apiRequest.requst('GET', this.pathRequest.employeesPath + '/' + this.userSessionService.user.id)
        .subscribe((responseData: any[]) => {
          if (responseData) {
            responseData.forEach(employee => {
              const tempEmployee: Employee = {email: employee.email, isSelected: false};
              this.employees.push(tempEmployee);
            });
            this.canShowContent = true;
          }
          this.spinner.hide();
        }, error => {
          this.spinner.hide();
        });
    }

    public extendBusinessRequest() { 
      this.spinner.show();
      const successMsg: string = 'Your subscription was extended for another month';
      const errorMsg: string = 'An error occured. Please try again';
        this.apiRequest.requst('POST', this.pathRequest.updateBusinessAccountPath, this.userSessionService.user.id)
        .subscribe((responseData: UserBusinessSubscription) => {
          if (responseData) {
            if (responseData) {
              this.userDetailsService.userBusinessSubscription = responseData;
            }
            this.canShowContent = true;
          }
          this.spinner.hide();
          this.toastr.success(successMsg);
        }, error => {
          this.spinner.hide();
          this.toastr.error(errorMsg);
        });
    }

    public activateBusinessRequest() { 
      this.spinner.show();
      const successMsg: string = 'Your subscription was actived';
      const errorMsg: string = 'An error occured. Please try again';
        this.apiRequest.requst('POST', this.pathRequest.setBusinessAccountPath, this.userSessionService.user.id)
        .subscribe((responseData: UserBusinessSubscription) => {
          if (responseData) {
            this.userDetailsService.userBusinessSubscription = responseData;
          }
          this.spinner.hide();
          this.toastr.success(successMsg);
        }, error => {
          this.spinner.hide();
          this.toastr.error(errorMsg);
        });
    }

}