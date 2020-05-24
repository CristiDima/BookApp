import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { APIRequestService } from '../../shared/api-request.service';
import { PathRequestService } from '../../shared/path-request.service';
import { PagesRouting } from '../../shared/pages-routing.service';
import { AuthenticationService } from '../../shared/authentication.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  protected resetePassword: FormGroup = null;

  constructor(private _pagesRouting: PagesRouting, private apiRequest: APIRequestService,
              private _pathRequest: PathRequestService, private _authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.resetePassword = new FormGroup({
        'email': new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  protected onSubmit() {
      const email: string = this.resetePassword.controls.email.value;
      this._authenticationService.resetPassword(email);
  }

  public onCancel() {
    this.resetePassword.reset();
    this._pagesRouting.LoginPage();
  }
}