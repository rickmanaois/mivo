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
// import {
//   IDropdownSettings
// } from 'ng-multiselect-dropdown';
import {
  QQTravel
} from '../../objects/QQTravel';

@Component({
  selector: 'app-quick-quotation-travel',
  templateUrl: './quick-quotation-travel.component.html',
  styleUrls: ['./quick-quotation-travel.component.css']
})
export class QuickQuotationTravelComponent implements OnInit, AfterViewChecked {
  @Input() travelDetails = new QQTravel();
  option: string = '';
  quickQuoteForm: FormGroup;

  mindate : Date = new Date();
  endDateMinDate : Date = moment().add(1, 'days').toDate();
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
    this.createQuickQuoteForm();
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

  createQuickQuoteForm() {
    this.quickQuoteForm = this.fb.group({
      currency: ['', Validators.required],
      country: ['', Validators.required],
      package: ['', Validators.required],
      coverage: ['', Validators.required],
      purposeTrip: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      noOfDays: ['', Validators.required],
      ageRange: ['', Validators.required]
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

  getCountry(){
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
    this.quickQuoteForm.get('endDate').valueChanges.subscribe(date => {
      var diff = moment(date).diff(moment(this.quickQuoteForm.get('startDate').value), 'days');
      this.travelDetails.noOfDays = diff >= 1 ? diff : 0;
    });

    this.quickQuoteForm.get('startDate').valueChanges.subscribe(date => {
      this.enableEndDate = date !== null && date !== undefined;
      var diff = 0;
      if (this.enableEndDate) {
        var diff = moment(this.quickQuoteForm.get('endDate').value).diff(moment(date), 'days');
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
  }

  quickQuote(travelDetails: QQTravel) {
    console.log(travelDetails);
  }

}
