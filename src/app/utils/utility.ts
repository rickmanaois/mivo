import {
  AbstractControl
} from '@angular/forms';

export class Utility {
  static updateValidator(input: AbstractControl, validator: any) {
    input.setValidators(validator);
    input.updateValueAndValidity();
  }
}
