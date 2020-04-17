import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserSessionService } from '../shared/user-session.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  protected userInfo: FormGroup = null;
  protected isOnEditMode: boolean = false;
  protected userInfoForm: FormGroup = null;

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
      'address': new FormControl({value: this._userSessionService.userAddress.address, disabled: !this.isOnEditMode},
                  [Validators.required]),
      'city': new FormControl({value: this._userSessionService.userAddress.city, disabled: !this.isOnEditMode},
                  [Validators.required]),
      'district': new FormControl({value: this._userSessionService.userAddress.district, disabled: !this.isOnEditMode},
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
