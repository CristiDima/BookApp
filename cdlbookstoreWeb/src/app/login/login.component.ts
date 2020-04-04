import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PagesRouting } from '../shared/pages-routing.service';
import { APIRequestService } from '../shared/api-request.service';
import { PathRequestService } from '../shared/path-request.service';
import { UserLoginDetails } from '../models/user.model';
import {Md5} from "md5-typescript";
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']

})
export class LoginComponent implements OnInit {

  protected signinForm: FormGroup = null;

  constructor(private _pagesRouting: PagesRouting, private apiRequest: APIRequestService,
              private _pathRequest: PathRequestService, private _authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.signinForm = new FormGroup({
        'username': new FormControl(null, [Validators.required]),
        'password': new FormControl(null, [Validators.required])
    });
  }

  protected onSubmit() {
    const userLoginDetails: UserLoginDetails = new UserLoginDetails();
    userLoginDetails.username = this.signinForm.value.username;
    userLoginDetails.password = Md5.init(this.signinForm.value.password);
    this._authenticationService.login(userLoginDetails);
    this.signinForm.reset();
  }

  onCancel() {
    this.signinForm.reset();
  }

  onSignUpPage() {
    this._pagesRouting.SignUpPage();
  }

}
