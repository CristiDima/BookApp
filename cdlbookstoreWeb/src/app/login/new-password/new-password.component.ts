import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PagesRouting } from 'src/app/shared/pages-routing.service';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { Md5 } from 'md5-typescript';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  protected changePassword: FormGroup = null;

  constructor(private _pagesRouting: PagesRouting, private apiRequest: APIRequestService,
              private _pathRequest: PathRequestService, private _authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.changePassword = new FormGroup({
        'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
        'repeatPassword': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  protected onSubmit() {
      const password: string = Md5.init(this.changePassword.controls.password.value);
      this._authenticationService.resetPassword(password);
  }

  public onCancel() {
    this.changePassword.reset();
    this._pagesRouting.LoginPage();
  }

}
