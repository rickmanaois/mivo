import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import {
  CarLOVServices
} from 'src/app/services/lov/car.service';

@Component({
  selector: 'app-coverage-variable-data',
  templateUrl: './coverage-variable-data.component.html',
  styleUrls: ['./coverage-variable-data.component.css']
})
export class CoverageVariableDataComponent implements OnInit {

  variableForm: FormGroup;
  sumInsuredPerPassengerLOV: any[];

  constructor(public dialogRef: MatDialogRef < CoverageVariableDataComponent > ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private cls: CarLOVServices) {
    this.createVariableForm();
  }

  coverage = this.data.c.coverage;
  code = this.data.c.code;

  createVariableForm() {
    this.variableForm = this.fb.group({
      //1101
      lossAndDamageType: {
        value: null,
        disabled: true
      },
      finalRate: ['', [Validators.nullValidator]],
      adjustedCommissionRate: ['', [Validators.nullValidator]],
      lossRatioRate: ['', [Validators.nullValidator]],

      //1002
      ownDamageTowingLimit: {
        value: null,
        disabled: true
      },
      ownDamageRepairLimit: {
        value: null,
        disabled: true
      },
      ownDamageSpecialDeductible: {
        value: null,
        disabled: true
      },

      //1003
      theftTowingLimit: {
        value: null,
        disabled: true
      },
      theftRepairLimit: {
        value: null,
        disabled: true
      },
      theftSpecialDeductible: {
        value: null,
        disabled: true
      },

      //1007
      uppaDiscountType: {
        value: null,
        disabled: true
      },
      uppaDiscountAmount: {
        value: null,
        disabled: true
      },
      uppaCommissionAdjustment: ['', [Validators.nullValidator]],
      sumInsuredPerPassenger: ['', [Validators.nullValidator]],

      //1008
      aonFinalRate: ['', [Validators.nullValidator]],
      aonTowingLimit: {
        value: null,
        disabled: true
      },
      aonRepairLimit: {
        value: null,
        disabled: true
      },
      aonSpecialDeductible: {
        value: null,
        disabled: true
      },
      aonCommissionAdjustment: ['', [Validators.nullValidator]],

      //1020
      srccFinalRate: ['', [Validators.nullValidator]],
      srccTowingLimit: {
        value: null,
        disabled: true
      },
      srccRepairLimit: {
        value: null,
        disabled: true
      },
      srccSpecialDeductible: {
        value: null,
        disabled: true
      },
      srccCommissionAdjustment: ['', [Validators.nullValidator]],

      //1040
      roadAssistDiscount: {
        value: null,
        disabled: true
      },

      //1029
      ra100Discount: {
        value: null,
        disabled: true
      }
    }, {
      updateOn: 'submit'
    });
  }

  ngOnInit(): void {
    if (this.code == 1007) {
      this.cls.getSumInsuredPerPassenger(this.data.subline).then((res) => {
        this.sumInsuredPerPassengerLOV = res;
      });
    }
  }

  update(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
