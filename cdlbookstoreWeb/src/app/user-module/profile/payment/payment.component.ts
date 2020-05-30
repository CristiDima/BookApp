import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from 'src/app/shared/user-details.service';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { PathRequestService } from 'src/app/shared/path-request.service';
import {UserPhysicalSubscription } from 'src/app/models/user.model';
import { UserSessionService } from 'src/app/shared/user-session.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { APIMessagesService } from 'src/app/shared/api-messages.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  protected isPhysicalSubscriptions = false;

  constructor(protected userDetails: UserDetailsService, private apiRequest: APIRequestService,
              private pathRequest: PathRequestService, protected userSession: UserSessionService,
              private spinner: NgxSpinnerService, private apiMessage: APIMessagesService) { }

  ngOnInit() {
    if (this.userDetails.userPhysicalSubscription && this.userDetails.userPhysicalSubscription.valid) {
      this.isPhysicalSubscriptions = true;
    }
  }

  public get date(): Date {
    return this.userDetails.userPhysicalSubscription.expiresAt;
  }

  //#region events
  protected onPhysicalSubscription(): void {
    this.setPhysicalSubscription();
  }
  //#endregion

  //#region request events
  private setPhysicalSubscription(): any {
    this.spinner.show();
    this.apiRequest.requst('PUT', this.pathRequest.physicalAccountPath, this.userSession.user.id)
    .subscribe((responeData: UserPhysicalSubscription) => {
      if (responeData) {
        this.userDetails.userPhysicalSubscription = responeData;
        this.isPhysicalSubscriptions = true;
      }
      this.spinner.hide();
      this.apiMessage.onActivateSubscriptionMsg();
    }, error => {
      this.spinner.hide();
      this.apiMessage.onActivateSubscriptionMsg(error);
    });
  }
  //#endregion

}
