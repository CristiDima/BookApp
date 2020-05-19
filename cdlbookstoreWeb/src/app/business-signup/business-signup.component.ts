import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Md5 } from 'md5-typescript';
import { NgxSpinnerService } from 'ngx-spinner';
import { PagesRouting } from 'src/app/shared/pages-routing.service';
import { CustomValidatorService } from 'src/app/validators/custom-validator.service';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { PathRequestService } from 'src/app/shared/path-request.service';

@Component({
  selector: 'app-business-signup',
  templateUrl: './business-signup.component.html',
  styleUrls: ['./business-signup.component.scss']
})
export class BusinessSignupComponent implements OnInit {

  protected signupForm: FormGroup = null;
  protected hasError: boolean = false;
  protected errorMessage: string = '';
  private phoneNumberRegex: any = /^(?:(?:(?:00\s?|\+)40\s?|0)(?:7\d{2}\s?\d{3}\s?\d{3}|(21|31)\d{1}\s?\d{3}\s?\d{3}|((2|3)[3-7]\d{1})\s?\d{3}\s?\d{3}|(8|9)0\d{1}\s?\d{3}\s?\d{3}))$/;

  constructor(private _pagesRouting: PagesRouting, private apiRequest: APIRequestService,
              private pathRequest: PathRequestService, private customValidatorsService: CustomValidatorService,
              private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      'companyName': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'repeatPassword': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'phoneNumber': new FormControl(null, [Validators.required, Validators.pattern(this.phoneNumberRegex)]),
      'address': new FormControl(null, [Validators.required]),
      'city': new FormControl(null, [Validators.required]),
      'district': new FormControl(null, [Validators.required])
    }, {
      validators: [
        this.customValidatorsService.passwordsMatch('password', 'repeatPassword'),
      ]
    });
  }

  //region events
  protected onSubmit():void {
    const userDetails: Map<string, any> = new Map<string, string>();
    Object.keys(this.signupForm.controls).forEach(key => {
       if (key === 'password') {
         const pass: string = Md5.init(this.signupForm.controls[key].value);
         userDetails.set(key, pass);
       } else if (key !== 'repeatPassword') {
         userDetails.set(key, this.signupForm.controls[key].value);
       }
    });
    this.saveUserRequest(userDetails);
  }

  protected onCancel(): void {
    this.signupForm.reset();
  }
  //endregion


  //request events
  private saveUserRequest(userDetails: Map<string, any>): void {
    const convMap = {};
    userDetails.forEach((val: string, key: string) => {
      convMap[key] = val;
    });
    this.spinner.show();
    this.apiRequest.requst('POST', this.pathRequest.signupPath, convMap).subscribe((responseData: any) => {
        this.hasError = false;
        this._pagesRouting.LoginPage();
        this.signupForm.reset();
        this.spinner.hide();
    }, 
    error => {
      this.hasError = true;
      this.errorMessage = error.error;
      this.spinner.hide();
  });
  }
  //endregion
}