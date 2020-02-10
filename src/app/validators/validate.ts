import {
  AbstractControl,
  Validators
} from '@angular/forms';
import * as moment from 'moment';
import {
  Utility
} from '../utils/utility';
import {
  GroupPolicy
} from '../objects/GroupPolicy';

export function validateUrl(control: AbstractControl) {
  if (!control.value.startsWith('https') || !control.value.includes('.io')) {
    return {
      validUrl: true
    };
  }
  return null;
}

export function setGroupPolicyValidations(form: any, gp: GroupPolicy) {
  var groupPolicy = form.get('groupPolicy');
  var contract = form.get('contract');
  var subContract = form.get('subContract');

  var cbIsRenewal = form.get('cbIsRenewal');
  var expiringPolicyNumber = form.get('expiringPolicyNumber');

  groupPolicy.valueChanges.subscribe(policy => {
    if (policy !== undefined) {
      var hasPolicy = policy !== null && policy !== '';
      if (!hasPolicy) {
        gp.contract = null;
        gp.subContract = null;
      }

      Utility.updateValidator(contract, hasPolicy ? Validators.required : null);
      Utility.updateValidator(subContract, hasPolicy ? Validators.required : null);
    }
  });

  cbIsRenewal.valueChanges.subscribe(isRenewal => {
    if (isRenewal != undefined ) {
      gp.expiringPolicyNumber = Utility.setNull(isRenewal, gp.expiringPolicyNumber);
      Utility.updateValidator(expiringPolicyNumber, isRenewal ? Validators.required : null);
    }
  });
}

export function setEffecivityDateValidations(form: any, details: any, expiryDateMinDate: Date) {
  form.get('effectivityDate').valueChanges.subscribe(date => {
    details.expiryDate = moment(date).add(1, 'years').toDate();
    expiryDateMinDate = details.expiryDate;
  });
}
