import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PagesRouting } from '../shared/pages-routing.service';
import { APIRequestService } from '../shared/api-request.service';
import { PathRequestService } from '../shared/path-request.service';
import { Md5 } from 'md5-typescript';
import { CustomValidatorService } from '../validators/custom-validator.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { APIMessagesService } from '../shared/api-messages.service';

@Component({
  selector: 'app-employer-signup',
  templateUrl: './employer-signup.component.html',
  styleUrls: ['./employer-signup.component.scss']
})
export class EmployerSignupComponent implements OnInit {

  protected signupForm: FormGroup = null;
  // tslint:disable-next-line: max-line-length
  private phoneNumberRegex: any = /^(?:(?:(?:00\s?|\+)40\s?|0)(?:7\d{2}\s?\d{3}\s?\d{3}|(21|31)\d{1}\s?\d{3}\s?\d{3}|((2|3)[3-7]\d{1})\s?\d{3}\s?\d{3}|(8|9)0\d{1}\s?\d{3}\s?\d{3}))$/;
  private businessId: number = null;

  constructor(private pagesRouting: PagesRouting, private apiRequest: APIRequestService, private route: ActivatedRoute,
              private pathRequest: PathRequestService, private customValidatorsService: CustomValidatorService,
              private spinner: NgxSpinnerService,  private apiMessage: APIMessagesService) {
    this.businessId = this.route.snapshot.queryParams.id;
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      repeatPassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(null, [Validators.required, Validators.pattern(this.phoneNumberRegex)])
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


  //#region request events
  private saveUserRequest(userDetails: Map<string, any>): void {
    const convMap = {};
    userDetails.forEach((val: string, key: string) => {
      convMap[key] = val;
    });

    // tslint:disable-next-line: no-string-literal
    convMap['is_from_business'] = true;
    // tslint:disable-next-line: no-string-literal
    convMap['companyId'] = this.businessId;
    this.spinner.show();
    this.apiRequest.requst('POST', this.pathRequest.signupPath, convMap).subscribe((responseData: any) => {
        this.pagesRouting.LoginPage();
        this.signupForm.reset();
        this.spinner.hide();
    },
    error => {
      this.onCancel();
      this.apiMessage.onExistingAccountMsg();
      this.spinner.hide();
  });
  }
  //#endregion
}
