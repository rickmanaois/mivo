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
  QQTravel
} from '../../objects/QQTravel';

@Component({
  selector: 'app-quotation-travel',
  templateUrl: './quotation-travel.component.html',
  styleUrls: ['./quotation-travel.component.css']
})
export class QuotationTravelComponent implements OnInit, AfterViewChecked {
  @Input() travelDetails = new QQTravel();
  option: string = '';
  quoteForm: FormGroup;

  mindate = new Date();
  enableEndDate: boolean = false;

  currencyLOV: any[];
  countryLOV: any[];
  packageLOV: any[];
  coverageLOV: any[];
  purposeTripLOV: any[];
  ageRangeLOV: any[];

  dropdownSettings = {};

  constructor(
    private fb: FormBuilder,
    // private qq: QuickQuoteService,
    // private lov: LovService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.createquoteForm();
    this.setValidations();
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  ngOnInit() {
    this.getCurrency();
    this.getPackage();
    this.getCoverage();
    this.getPurposeTrip();
    this.getAgeRange();
    this.getCountry();

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

  createquoteForm() {
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

      groupPolicy: [null],
      contract: [null],
      subContract: [null],
      commercialStructure: ['', Validators.required],
      agentCode: ['', Validators.required],
      isRenewal: [null],
      expiringPolicyNumber: [null],
      //policy holder information
      clientName: ['', Validators.required],
      //travellers
      //new object
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
    this.packageLOV = [{
      value: "1",
      name: "test"
    }];
  }

  getCoverage() {
    this.coverageLOV = [{
      value: "1",
      name: "test"
    }];
  }

  getPurposeTrip() {
    this.purposeTripLOV = [{
      value: "1",
      name: "test"
    }];
  }

  getAgeRange() {
    this.ageRangeLOV = [{
      value: "1",
      name: "test"
    }];
  }

  setValidations() {
    this.quoteForm.get('endDate').valueChanges.subscribe(date => {
      var diff = (date - this.quoteForm.get('startDate').value) / 1000 / 60 / 60 / 24;
      diff = diff === NaN ? 0 : diff;
      this.travelDetails.noOfDays = diff > 0 ? diff : 0;
    });

    this.quoteForm.get('startDate').valueChanges.subscribe(date => {
      this.enableEndDate = date !== null && date !== undefined;
      var diff = (this.quoteForm.get('endDate').value - date) / 1000 / 60 / 60 / 24;
      diff = diff === NaN ? 0 : diff;

      if (!this.enableEndDate || (diff < 0)) {
        this.travelDetails.endDate = null;
      }
      this.travelDetails.noOfDays = diff > 0 ? diff : 0;
    });
  }

  quickQuote(travelDetails: QQTravel) {
    console.log(travelDetails);
  }

}
