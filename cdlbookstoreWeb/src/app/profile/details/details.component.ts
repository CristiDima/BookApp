import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserSessionService } from 'src/app/shared/user-session.service';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { UserDetailsService } from 'src/app/shared/user-details.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  
  protected userInfo: FormGroup = null;
  protected isOnEditMode: boolean = false;
  protected userInfoForm: FormGroup = null;
  protected hasError: boolean = false;
  protected errorMessage: string = '';
  private phoneNumberRegex: any = /^(?:(?:(?:00\s?|\+)40\s?|0)(?:7\d{2}\s?\d{3}\s?\d{3}|(21|31)\d{1}\s?\d{3}\s?\d{3}|((2|3)[3-7]\d{1})\s?\d{3}\s?\d{3}|(8|9)0\d{1}\s?\d{3}\s?\d{3}))$/;

  constructor(private userSessionService: UserSessionService, private apiRequest: APIRequestService,
              private pathRequest: PathRequestService, private userDetailsService: UserDetailsService, 
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.formReset();
  }

  protected formReset(): void {
    this.userInfoForm = new FormGroup({
      'firstName': new FormControl({value: this.userSessionService.user.firstName, disabled: !this.isOnEditMode}, 
                  [Validators.required]),
      'lastName': new FormControl({value: this.userSessionService.user.lastName, disabled: !this.isOnEditMode},
                  [Validators.required]),
      'email': new FormControl({value: this.userSessionService.user.email, disabled: !this.isOnEditMode},
                  [Validators.required, Validators.email]),
      'phoneNumber': new FormControl({value: this.userSessionService.user.phoneNumber, disabled: !this.isOnEditMode},
                  [Validators.required, Validators.pattern(this.phoneNumberRegex)]),
      'address': new FormControl({value: this.userDetailsService.address.address, disabled: !this.isOnEditMode},
                  [Validators.required]),
      'city': new FormControl({value: this.userDetailsService.address.city, disabled: !this.isOnEditMode},
                  [Validators.required]),
      'district': new FormControl({value: this.userDetailsService.address.district, disabled: !this.isOnEditMode},
                  [Validators.required])
    });
  }

  updateUserDetails() {
    this.userSessionService.user.firstName = this.userInfoForm.controls.firstName.value;
    this.userSessionService.user.lastName = this.userInfoForm.controls.lastName.value;
    this.userSessionService.user.phoneNumber = this.userInfoForm.controls.phoneNumber.value;
    this.userSessionService.user.email = this.userInfoForm.controls.email.value;
    this.userDetailsService.address.address = this.userInfoForm.controls.address.value;
    this.userDetailsService.address.address = this.userInfoForm.controls.city.value;
    this.userDetailsService.address.district = this.userInfoForm.controls.district.value;
  }

  //region eventshttps-proxy-agent
  protected onSubmit():void {
    const userDetails: Map<string, any> = new Map<string, any>();
    Object.keys(this.userInfoForm.controls).forEach(key => {
      userDetails.set(key, this.userInfoForm.controls[key].value);
    });
    this.editAuthorRequest(userDetails);

  }

  protected onCancel(): void {
    this.isOnEditMode = false;
    this.formReset();
  }

  protected onEdit(): void {
    this.isOnEditMode = true;
    this.formReset();
  }
  //endregion

  //region Requests
  private editAuthorRequest(userDetails: Map<string, any>): void {
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
    }, 
    error => {
      this.hasError = true;
      this.errorMessage = error.error.message;
      this.spinner.hide();
  });
  }
//endregion

}
