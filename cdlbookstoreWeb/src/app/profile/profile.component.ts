import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserSessionService } from '../shared/user-session.service';

@Component({
  selector: 'app-account',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfieComponent implements OnInit {

  protected userInfo: FormGroup = null;
  protected isOnEditMode: boolean = false;
  protected userInfoForm: FormGroup = null;
  private phoneNumberRegex: any = /^(?:(?:(?:00\s?|\+)40\s?|0)(?:7\d{2}\s?\d{3}\s?\d{3}|(21|31)\d{1}\s?\d{3}\s?\d{3}|((2|3)[3-7]\d{1})\s?\d{3}\s?\d{3}|(8|9)0\d{1}\s?\d{3}\s?\d{3}))$/;


  constructor(private _userSessionService: UserSessionService) { }

  ngOnInit() {
    this.formReset();
  }

  protected formReset(): void {
    this.userInfoForm = new FormGroup({
      'firstname': new FormControl({value: this._userSessionService.user.firstName, disabled: !this.isOnEditMode}, 
                  [Validators.required]),
      'lastname': new FormControl({value: this._userSessionService.user.lastName, disabled: !this.isOnEditMode},
                  [Validators.required]),
      'email': new FormControl({value: this._userSessionService.user.email, disabled: !this.isOnEditMode},
                  [Validators.required, Validators.email]),
      'phoneNumber': new FormControl({value: this._userSessionService.user.phoneNumber, disabled: !this.isOnEditMode},
                  [Validators.required, Validators.email, Validators.pattern(this.phoneNumberRegex)]),
      'address': new FormControl({value: this._userSessionService.address.address, disabled: !this.isOnEditMode},
                  [Validators.required]),
      'city': new FormControl({value: this._userSessionService.address.city, disabled: !this.isOnEditMode},
                  [Validators.required]),
      'district': new FormControl({value: this._userSessionService.address.district, disabled: !this.isOnEditMode},
                  [Validators.required])
    });
  }

  //region eventshttps-proxy-agent
  protected onSubmit():void {
    this.isOnEditMode = false;
    this.formReset();
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

}
