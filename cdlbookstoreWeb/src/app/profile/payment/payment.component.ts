import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from 'src/app/shared/user-details.service';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { UserOnlineSubscription, UserPhysicalSubscription } from 'src/app/models/user.model';
import { UserSessionService } from 'src/app/shared/user-session.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  protected successMsg: string = 'Your subscription is active until: ';
  protected errorMesg: string = 'Your subscriptions is not active';
  protected isOnlineSubscriptions: boolean = false;
  protected isPhysicalSubscriptions: boolean = false;

  constructor(private userDetails: UserDetailsService, private apiRequest: APIRequestService,
              private pathRequest: PathRequestService, private userSession: UserSessionService, 
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    if (this.userDetails.userOnlineSubscription && this.userDetails.userOnlineSubscription.valid) {
      this.isOnlineSubscriptions = true;
    }

    if (this.userDetails.userPhysicalSubscription && this.userDetails.userPhysicalSubscription.valid) {
      this.isPhysicalSubscriptions = true;
    }
  }

  //region events
  protected onOnlineSubscription(): void {
    this.setOnlineSubscription();
  }

  protected onPhysicalSubscription(): void {
    this.setPhysicalSubscription();
  }

  protected onFullSubscription(): void {
    this.setOnlineSubscription();
    this.setPhysicalSubscription();
  }
  //endregion

  //request events
  private setOnlineSubscription(): any {
    this.spinner.show();
    this.apiRequest.requst('PUT', this.pathRequest.onlineAccountPath, this.userSession.user.id)
    .subscribe((responeData: UserOnlineSubscription) => {
      if (responeData) {
        this.userDetails.userOnlineSubscription = responeData;
        this.isOnlineSubscriptions = true;
      }
      this.spinner.hide();
    }, error => {
      
    });
  }

  private setPhysicalSubscription(): any {
    this.spinner.show();
    this.apiRequest.requst('PUT', this.pathRequest.physicalAccountPath, this.userSession.user.id)
    .subscribe((responeData: UserPhysicalSubscription) => {
      if (responeData) {
        this.userDetails.userPhysicalSubscription = responeData;
        this.isPhysicalSubscriptions = true;
      }
      this.spinner.hide();
    }, error => {
      
    });
  }
  //endregion

}
