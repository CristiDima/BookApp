import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserSessionService } from 'src/app/shared/user-session.service';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { UserDetailsService } from 'src/app/shared/user-details.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { APIMessagesService } from 'src/app/shared/api-messages.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  protected userInfo: FormGroup = null;
  protected isOnEditMode = false;
  protected userInfoForm: FormGroup = null;
  protected hasError = false;
  protected errorMessage = '';
  // tslint:disable-next-line: max-line-length
  private phoneNumberRegex: any = /^(?:(?:(?:00\s?|\+)40\s?|0)(?:7\d{2}\s?\d{3}\s?\d{3}|(21|31)\d{1}\s?\d{3}\s?\d{3}|((2|3)[3-7]\d{1})\s?\d{3}\s?\d{3}|(8|9)0\d{1}\s?\d{3}\s?\d{3}))$/;

  constructor(protected userSessionService: UserSessionService, private apiRequest: APIRequestService,
              private pathRequest: PathRequestService, private userDetailsService: UserDetailsService,
              private spinner: NgxSpinnerService, private apiMessage: APIMessagesService) { }

  ngOnInit() {
    this.formReset();
  }

  protected formReset(): void {
    const firstName: string = this.userSessionService.user ? this.userSessionService.user.firstName : null;
    const lastName: string = this.userSessionService.user ? this.userSessionService.user.lastName : null;
    const email: string = this.userSessionService.user ? this.userSessionService.user.email : null;
    const phoneNumber: number = this.userSessionService.user ? this.userSessionService.user.phoneNumber : null;
    const address: string = this.userDetailsService.address ? this.userDetailsService.address.address : null;
    const city: string = this.userDetailsService.address ? this.userDetailsService.address.city : null;
    const district: string = this.userDetailsService.address ? this.userDetailsService.address.district : null;

    this.userInfoForm = new FormGroup({
      firstName: new FormControl({value: firstName, disabled: !this.isOnEditMode}, [Validators.required]),
      lastName: new FormControl({value: lastName, disabled: !this.isOnEditMode}, [Validators.required]),
      email: new FormControl({value: email, disabled: !this.isOnEditMode}, [Validators.required, Validators.email]),
      phoneNumber: new FormControl({value: phoneNumber, disabled: !this.isOnEditMode},
                    [Validators.required, Validators.pattern(this.phoneNumberRegex)]),
      address: new FormControl({value: address, disabled: !this.isOnEditMode}, [Validators.required]),
      city: new FormControl({value: city, disabled: !this.isOnEditMode}, [Validators.required]),
      district: new FormControl({value: district, disabled: !this.isOnEditMode}, [Validators.required])
    });
  }

  updateUserDetails() {
    this.userSessionService.user.firstName = this.userInfoForm.controls.firstName.value;
    this.userSessionService.user.lastName = this.userInfoForm.controls.lastName.value;
    this.userSessionService.user.phoneNumber = this.userInfoForm.controls.phoneNumber.value;
    this.userSessionService.user.email = this.userInfoForm.controls.email.value;
    this.userDetailsService.address.address = this.userInfoForm.controls.address.value;
    this.userDetailsService.address.city = this.userInfoForm.controls.city.value;
    this.userDetailsService.address.district = this.userInfoForm.controls.district.value;
  }

  //#region events
  protected onSubmit(): void {
    const userDetails: Map<string, any> = new Map<string, any>();
    Object.keys(this.userInfoForm.controls).forEach(key => {
      userDetails.set(key, this.userInfoForm.controls[key].value);
    });
    this.editUserDetails(userDetails);

  }

  protected onCancel(): void {
    this.isOnEditMode = false;
    this.formReset();
  }

  protected onEdit(): void {
    this.isOnEditMode = true;
    this.formReset();
  }
  //#endregion

  //#region Requests
  private editUserDetails(userDetails: Map<string, any>): void {
    const convMap = {};
    userDetails.forEach((val: string, key: string) => {
      convMap[key] = val;
    });
    this.spinner.show();
    this.apiRequest.requst('PUT', this.pathRequest.userPath + '/' + this.userSessionService.user.id, convMap)
    .subscribe((responseData: any) => {
      this.isOnEditMode = false;
      this.updateUserDetails();
      this.formReset();
      this.hasError = false;
      this.spinner.hide();
      this.apiMessage.onEditUserDetailsMsg();
    },
    error => {
      this.spinner.hide();
      this.apiMessage.onEditUserDetailsMsg(error);
  });
  }
  //#endregion
}
