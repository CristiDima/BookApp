import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from 'src/app/shared/user-details.service';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { PathRequestService } from 'src/app/shared/path-request.service';
import {UserPhysicalSubscription } from 'src/app/models/user.model';
import { UserSessionService } from 'src/app/shared/user-session.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  protected successMsg: string = 'Your subscription is active until: ';
  protected errorMesg: string = 'Your subscriptions is not active';
  protected isPhysicalSubscriptions: boolean = false;

  constructor(private userDetails: UserDetailsService, private apiRequest: APIRequestService,
              private pathRequest: PathRequestService, private userSession: UserSessionService, 
              private spinner: NgxSpinnerService, private toastr: ToastrService) { }

  ngOnInit() {
    if (this.userDetails.userPhysicalSubscription && this.userDetails.userPhysicalSubscription.valid) {
      this.isPhysicalSubscriptions = true;
    }
  }

  //#region events
  protected onPhysicalSubscription(): void {
    this.setPhysicalSubscription();
  }
  //#endregion

  //#request events
  private setPhysicalSubscription(): any {
    this.spinner.show();
    const successMsg: string = 'Your subscription was activated.';
    const errorMsg: string = 'An error occured. Please try again.';
    this.apiRequest.requst('PUT', this.pathRequest.physicalAccountPath, this.userSession.user.id)
    .subscribe((responeData: UserPhysicalSubscription) => {
      if (responeData) {
        this.userDetails.userPhysicalSubscription = responeData;
        this.isPhysicalSubscriptions = true;
      }
      this.spinner.hide();
      this.toastr.success(successMsg);
    }, error => {
      this.spinner.hide();
      this.toastr.error(errorMsg);
    });
  }
  //#endregion

}
