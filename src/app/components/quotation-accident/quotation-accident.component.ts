import {
  Component,
  OnInit,
  Input,
  AfterViewChecked,
  ChangeDetectorRef
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import * as moment from 'moment';
import {
  QuoteAccident
} from '../../objects/QuoteAccident';
import {
  GroupPolicy
} from 'src/app/objects/GroupPolicy';
import {
  Utility
} from '../../utils/utility';
import {
  GroupPolicyLOV as lovUtil
} from '../../utils/lov/groupPolicy';
import {
  Validate
} from '../../validators/validate';
import {
  AccidentListObject
} from 'src/app/objects/LOV/accidentList';
import {
  GroupPolicyListObject
} from 'src/app/objects/LOV/groupPolicyList';

@Component({
  selector: 'app-quotation-accident',
  templateUrl: './quotation-accident.component.html',
  styleUrls: ['./quotation-accident.component.css']
})
export class QuotationAccidentComponent implements OnInit, AfterViewChecked {
  @Input() accidentDetails = new QuoteAccident();
  @Input() groupPolicy = new GroupPolicy();
  quoteForm: FormGroup;
  mindate: Date = new Date();
  expiryDateMinDate: Date = moment().add(1, 'years').toDate();

  showDetails: boolean = false;
  showSPADetails: boolean = false;
  showHCBIDetails: boolean = false;

  LOV = new AccidentListObject();
  GPLOV = new GroupPolicyListObject();

  constructor(
    private fb: FormBuilder,
    // private qq: QuickQuoteService,
    // private lov: LovService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.createQuoteForm();
    this.setValidations();
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  ngOnInit() {
    this.getSubline();

    this.GPLOV.groupPolicyLOV = lovUtil.getGroupPolicy();
    this.GPLOV.contractLOV = lovUtil.getContract();
    this.GPLOV.subContractLOV = lovUtil.getSubContract();
    this.GPLOV.commercialStructureLOV = lovUtil.getCommercialStructure();

    this.getSuffix();
    this.getGender();
    this.getRelationship();
    this.getOccupationalClass();
    this.getOccupation();

    this.getDisablementValue();
    this.getProductList();
  }

  createQuoteForm() {
    this.quoteForm = this.fb.group({
      subline: ['', Validators.required],
      //group policy
      groupPolicy: [null],
      contract: [null],
      subContract: [null],
      commercialStructure: ['', Validators.required],
      agentCode: ['', Validators.required],
      cbIsRenewal: [null],
      expiringPolicyNumber: [null],
      //general information
      effectivityDate: ['', Validators.required],
      expiryDate: ['', Validators.required],
      //policy holder information
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      //insured details
      middleName: [null],
      suffix: [null],
      gender: ['', Validators.required],
      relationship: ['', Validators.required],
      birthDate: ['', Validators.required],
      cbWithHealthDeclaration: [null],
      preExistingIllness: [null],
      occupationalClass: ['', Validators.required],
      occupation: ['', Validators.required],

      //disablement value
      disablementValue: [null],
      //product data
      productList: ['', Validators.required],
    });
  }

  setValidations() {
    var subline = this.quoteForm.get('subline');
    var disablementValue = this.quoteForm.get('disablementValue');

    subline.valueChanges.subscribe(subline => {
      //removing required validation
      Utility.updateValidator(disablementValue, null);
      this.showDetails = false;
      this.showSPADetails = false;
      this.showHCBIDetails = false;
      if (subline == 323) { //standard personal accident
        this.showDetails = true;
        this.showSPADetails = true;
        Utility.updateValidator(disablementValue, Validators.required);
      }
    });

    Validate.setGroupPolicyValidations(this.quoteForm, this.groupPolicy);
    // Validate.setEffecivityDateValidations(this.quoteForm, this.accidentDetails, this.expiryDateMinDate);
  }

  getSubline() {
    this.LOV.sublineLOV = [{
        value: "323",
        name: "Standard Personal Accident"
      },
      {
        value: "325",
        name: "Family Provider's Accident Insurance"
      },
      {
        value: "326",
        name: "Hospital Cash Benefit Insurance"
      }
    ];
  }

  getSuffix() {
    this.LOV.suffixLOV = [{
      value: "1",
      name: "test"
    }];
  }

  getGender() {
    this.LOV.genderLOV = [{
      value: "1",
      name: "test"
    }];
  }

  getRelationship() {
    this.LOV.relationshipLOV = [{
      value: "1",
      name: "test"
    }];
  }

  getOccupationalClass() {
    this.LOV.occupationalClassLOV = [{
      value: "1",
      name: "test"
    }];
  }

  getOccupation() {
    this.LOV.occupationLOV = [{
      value: "1",
      name: "test"
    }];
  }

  getDisablementValue() {
    this.LOV.disablementValueLOV = [{
      value: "1",
      name: "test"
    }];
  }

  getProductList() {
    this.LOV.productListLOV = [{
      value: "1",
      name: "test"
    }];
  }

  issueQuote(accidentDetails: QuoteAccident, groupPolicy: GroupPolicy) {
    console.log(accidentDetails, groupPolicy);
  }

}
