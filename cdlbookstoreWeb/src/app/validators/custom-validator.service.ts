import { Injectable } from "@angular/core";
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable()
export class CustomValidatorService {

    constructor(){
        
    }

    public passwordsMatch(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
          if (!control) { return null; }
          const password = control.get(passwordKey);
          const confirmPassword = control.get(confirmPasswordKey);
          if (!password.value || !confirmPassword.value) {
            return null;
          }
        
          if (password.value !== confirmPassword.value) {
            return { passwordMismatch: true };
          }
          return null;
        };
    }

}