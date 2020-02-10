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
  QuoteTravel
} from '../../objects/QuoteTravel';
import {
  GroupPolicy
} from 'src/app/objects/GroupPolicy';
import {
  setGroupPolicyValidations
} from '../../validators/validate';
import {
  LOV as lovUtil
} from '../../utils/lov';

@Component({
  selector: 'app-quotation-travel',
  templateUrl: './quotation-travel.component.html',
  styleUrls: ['./quotation-travel.component.css']
})
export class QuotationTravelComponent implements OnInit, AfterViewChecked {
  @Input() travelDetails = new QuoteTravel();
  @Input() groupPolicy = new GroupPolicy();
  quoteForm: FormGroup;

  mindate: Date = new Date();
  expiryDateMinDate: Date = moment().add(1, 'years').toDate();
  endDateMinDate: Date = moment().add(1, 'days').toDate();
  enableEndDate: boolean = false;

  currencyLOV: any[];
  countryLOV: any[];
  travelPackageLOV: any[];
  travelTypeLOV: any[];
  purposeOfTripLOV: any[];
  oneTripOnlyLOV: any[];

  groupPolicyLOV: any[];
  contractLOV: any[];
  subContractLOV: any[];
  commercialStructureLOV: any[];

  travelInsuranceLOV: any[];
  optionPackLOV: any[];
  medicalExpensesLOV: any[];

  dropdownSettings = {};

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
    this.getCountry();
    this.getCurrency();

    this.getPackage();
    this.getType();
    this.getPurposeTrip();
    this.getOneTrip();

    this.groupPolicyLOV = lovUtil.getGroupPolicy();
    this.contractLOV = lovUtil.getContract();
    this.subContractLOV = lovUtil.getSubContract();
    this.commercialStructureLOV = lovUtil.getCommercialStructure();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
  }

  createQuoteForm() {
    this.quoteForm = this.fb.group({
      currency: ['', Validators.required],
      country: ['', Validators.required],
      //general information
      travelPackage: ['', Validators.required],
      travelType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      noOfDays: ['', Validators.required],
      completeItinerary: ['', Validators.required],
      purposeOfTrip: ['', Validators.required],
      oneTripOnly: ['', Validators.required],
      //group policy
      groupPolicy: [null],
      contract: [null],
      subContract: [null],
      commercialStructure: ['', Validators.required],
      agentCode: ['', Validators.required],
      cbIsRenewal: [null],
      expiringPolicyNumber: [null],
      //policy holder information
      clientName: ['', Validators.required],
      //travellers
      //coverages
      travelInsurance: ['', Validators.required],
      optionPack: ['', Validators.required],
      medicalExpenses: ['', Validators.required],
    });
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  getCurrency() {
    this.currencyLOV = [{
      value: "1",
      name: "test"
    }];
  }

  getCountry() {
    this.countryLOV = [{
        item_id: 1,
        item_text: 'Mumbai'
      },
      {
        item_id: 2,
        item_text: 'Bangaluru'
      },
      {
        item_id: 3,
        item_text: 'Pune'
      },
      {
        item_id: 4,
        item_text: 'Navsari'
      },
      {
        item_id: 5,
        item_text: 'New Delhi'
      }
    ];
  }

  getPackage() {
    this.travelPackageLOV = [{
      value: "1",
      name: "test"
    }];
  }

  getType() {
    this.travelTypeLOV = [{
      value: "1",
      name: "test"
    }];
  }

  getPurposeTrip() {
    this.purposeOfTripLOV = [{
      value: "1",
      name: "test"
    }];
  }

  getOneTrip() {
    this.oneTripOnlyLOV = [{
      value: "1",
      name: "test"
    }];
  }

  setValidations() {
    var endDate = this.quoteForm.get('endDate');
    var startDate = this.quoteForm.get('startDate');

    endDate.valueChanges.subscribe(date => {
      var diff = moment(date).diff(moment(startDate.value), 'days');
      this.travelDetails.noOfDays = diff >= 1 ? diff : 0;
    });

    startDate.valueChanges.subscribe(date => {
      this.enableEndDate = date !== null && date !== undefined;
      var diff = 0;
      if (this.enableEndDate) {
        var diff = moment(endDate.value).diff(moment(date), 'days');
        diff = diff === NaN ? 0 : diff;
        this.endDateMinDate = moment(date).add(1, 'days').toDate();
        if (diff < 1) {
          this.travelDetails.endDate = null;
        }
      } else {
        this.travelDetails.endDate = null;
      }

      this.travelDetails.noOfDays = diff >= 1 ? diff : 0;
    });

    setGroupPolicyValidations(this.quoteForm, this.groupPolicy);
  }

  quickQuote(travelDetails: QuoteTravel, groupPolicy: GroupPolicy) {
    console.log(travelDetails, groupPolicy);
  }

}
