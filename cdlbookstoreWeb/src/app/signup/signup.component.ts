import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { PagesRouting } from '../shared/pages-routing.service';
import { APIRequestService } from '../shared/api-request.service';
import { PathRequestService } from '../shared/path-request.service';
import { Md5 } from 'md5-typescript';
import { CustomValidatorService } from '../validators/custom-validator.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  protected signupForm: FormGroup = null;
  protected hasError: boolean = false;
  protected errorMessage: string = '';
  private phoneNumberRegex: any = /^(?:(?:(?:00\s?|\+)40\s?|0)(?:7\d{2}\s?\d{3}\s?\d{3}|(21|31)\d{1}\s?\d{3}\s?\d{3}|((2|3)[3-7]\d{1})\s?\d{3}\s?\d{3}|(8|9)0\d{1}\s?\d{3}\s?\d{3}))$/;

  constructor(private _pagesRouting: PagesRouting, private _apiRequest: APIRequestService,
    private _pathRequest: PathRequestService, private customValidatorsService: CustomValidatorService) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      'firstname': new FormControl(null, [Validators.required]),
      'lastname': new FormControl(null, [Validators.required]),
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
    this._apiRequest.requst('POST', this._pathRequest.signupPath, convMap).subscribe((responseData: any) => {
        this.hasError = false;
        this._pagesRouting.LoginPage();
        this.signupForm.reset();
    }, 
    error => {
      this.hasError = true;
      this.errorMessage = error.error;
  });
  }
  //endregion
}
