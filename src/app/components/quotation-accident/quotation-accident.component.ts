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
import {
  QuoteAccident
} from '../../objects/QuoteAccident';
import {
  Utility
} from '../../utils/utility';

@Component({
  selector: 'app-quotation-accident',
  templateUrl: './quotation-accident.component.html',
  styleUrls: ['./quotation-accident.component.css']
})
export class QuotationAccidentComponent implements OnInit, AfterViewChecked {
  @Input() accidentDetails = new QuoteAccident();
  option: string = '';
  quoteForm: FormGroup;

  showDetails: boolean = false;
  showSPADetails: boolean = false;
  showHCBIDetails: boolean = false;

  sublineLOV: any[];
  disablementValueLOV: any[];

  groupPolicyLOV: any[];
  contractLOV: any[];
  subContractLOV: any[];
  commercialStructureLOV: any[];

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
    this.getGroupPolicy();
    this.getContract();
    this.getSubContract();
    this.getCommercialStructure();
    this.getDisablementValue();
  }

  createQuoteForm() {
    this.quoteForm = this.fb.group({
      subline: ['', Validators.required],
      groupPolicy: [null],
      contract: [null],
      subContract: [null],
      commercialStructure: ['', Validators.required],
      agentCode: ['', Validators.required],
      effectivityDate: ['', Validators.required],
      expiryDate: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      disablementValue: [null],
      productList: ['', Validators.required],
    });
  }

  getSubline() {
    this.sublineLOV = [{
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

  getGroupPolicy() {
    this.groupPolicyLOV = [{
      value: "1",
      name: "test"
    }];
  }

  getContract() {
    this.contractLOV = [{
      value: "1",
      name: "test"
    }];
  }

  getSubContract() {
    this.subContractLOV = [{
      value: "1",
      name: "test"
    }];
  }

  getCommercialStructure() {
    this.commercialStructureLOV = [{
      value: "1",
      name: "test"
    }];
  }

  getDisablementValue() {
    this.disablementValueLOV = [{
      value: "1",
      name: "test"
    }];
  }

  setValidations() {
    var subline = this.quoteForm.get('subline');
    var disablementValue = this.quoteForm.get('disablementValue');
    var groupPolicy = this.quoteForm.get('groupPolicy');
    // var contract = this.quoteForm.get('contract');
    var subContract = this.quoteForm.get('subContract');

    subline.valueChanges.subscribe(subline => {
      //removing required validation
      Utility.updateValidator(disablementValue, null);
      this.showDetails = false;
      this.showSPADetails = false;
      this.showHCBIDetails = false;
      if (subline == 323) { //standard personal accident
        this.showDetails = true;
        this.showSPADetails = true;
        Utility.updateValidator(disablementValue, ['', Validators.required]);
      }
    });

    groupPolicy.valueChanges.subscribe(policy => {
      var hasPolicy = policy !== null && policy !== undefined && policy !== '';
      console.log(subContract);
      // if (hasPolicy) {
      //   Utility.updateValidator(subContract, ['', Validators.required])
      // } else {
      //   Utility.updateValidator(subContract, null)
      // }
      // Utility.updateValidator(contract, hasPolicy ? ['', Validators.required] : null);
      // Utility.updateValidator(subContract, hasPolicy ? ['', Validators.required] : null);
    });
  }

  quickQuote(accidentDetails: QuoteAccident) {
    console.log(accidentDetails);
  }

}
