import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PagesRouting } from 'src/app/shared/pages-routing.service';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { Md5 } from 'md5-typescript';
import { CustomValidatorService } from 'src/app/validators/custom-validator.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  protected changePassword: FormGroup = null;

  constructor(private _pagesRouting: PagesRouting, private _authenticationService: AuthenticationService,
              private customValidatorsService: CustomValidatorService) {}

  ngOnInit() {
    this.changePassword = new FormGroup({
        'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
        'repeatPassword': new FormControl(null, [Validators.required, Validators.minLength(6)])
    }, {
      validators: [
        this.customValidatorsService.passwordsMatch('password', 'repeatPassword'),
      ]
    });
  }

  protected onSubmit() {
      const password: string = Md5.init(this.changePassword.controls.password.value);
      this.changePassword.reset()
      this._authenticationService.changePassword(password);
  }

  public onCancel() {
    this.changePassword.reset();
    this._pagesRouting.LoginPage();
  }

}
