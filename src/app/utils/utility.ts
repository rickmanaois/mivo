import {
  AbstractControl
} from '@angular/forms';
import {
  ModalComponent
} from '../components/modal/modal.component';
import * as moment from 'moment';

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

  static showError(modalService: any, message: String) {
    return this.modal(modalService, message, "Error");
  }

  static showWarning(modalService: any, message: String) {
    return this.modal(modalService, message, "Warning");
  }

  static showInfo(modalService: any, message: String) {
    return this.modal(modalService, message, "Info");
  }

  static modal(modalService: any, message: String, title: String) {
    const initialState = {
      message: message,
      title: title,
      isClose: true
    };
    return modalService.show(ModalComponent, {
      initialState
    });
  }

  //smooth scroll to preferred html element
  static scroll(id: string) {
    //buffer if id is hidden
    setTimeout(()=> {
      var el = document.getElementById(id);
      if (!this.isUndefined(el)) {
        el.scrollIntoView({behavior: 'smooth'});
      }
    }, 500);
  }

  //converts string value to integer
  static parseIntArray(arr: any[], param: string) {
    arr.forEach(a => {
      a[param] = parseInt(a[param]);
    });
    return arr;
  }

  //format date string
  static formatDate(d : Date, f ?: string) {
    const format = !this.isUndefined(f) ? f : "MM/DD/YYYY";
    return moment(d).format(format);
  }
}
