import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Md5 } from 'md5-typescript';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PagesRouting } from 'src/app/shared/pages-routing.service';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { CustomValidatorService } from 'src/app/validators/custom-validator.service';
import { PathRequestService } from 'src/app/shared/path-request.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  protected signupForm: FormGroup = null;
  // tslint:disable-next-line: max-line-length
  private phoneNumberRegex: any = /^(?:(?:(?:00\s?|\+)40\s?|0)(?:7\d{2}\s?\d{3}\s?\d{3}|(21|31)\d{1}\s?\d{3}\s?\d{3}|((2|3)[3-7]\d{1})\s?\d{3}\s?\d{3}|(8|9)0\d{1}\s?\d{3}\s?\d{3}))$/;

  constructor(private pagesRouting: PagesRouting, private apiRequest: APIRequestService, private toastr: ToastrService,
              private pathRequest: PathRequestService, private customValidatorsService: CustomValidatorService,
              private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      repeatPassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(null, [Validators.required, Validators.pattern(this.phoneNumberRegex)]),
      address: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      district: new FormControl(null, [Validators.required])
    }, {
      validators: [
        this.customValidatorsService.passwordsMatch('password', 'repeatPassword'),
      ]
    });
  }

  //#region events
  protected onSubmit(): void {
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
  //#endregion


  //#region events
  private saveUserRequest(userDetails: Map<string, any>): void {
    const convMap = {};
    userDetails.forEach((val: string, key: string) => {
      convMap[key] = val;
    });
    this.spinner.show();
    const errorMsg = 'An account with this email already exist.';
    this.apiRequest.requst('POST', this.pathRequest.signupPath, convMap).subscribe((responseData: any) => {
        this.pagesRouting.LoginPage();
        this.signupForm.reset();
        this.spinner.hide();
    },
    error => {
      this.toastr.error(errorMsg);
      this.spinner.hide();
      this.onCancel();
  });
  }
  //#endregion
}
