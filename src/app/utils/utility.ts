import {
  AbstractControl
} from '@angular/forms';

export class Utility {
  static updateValidator(input: AbstractControl, validator: any) {
    input.setValidators(validator);
    input.updateValueAndValidity();
  }

  static setNull(checked: boolean, value: any) {
    return !checked ? null : value;
  }

  static isEmpty(value: any) {
    return value === null || value === '';
  }

  static isUndefined(value: any) {
    return value === undefined || value === null || value === '';
  }
}
