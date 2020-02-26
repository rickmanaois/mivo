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
  QQTravel
} from '../../objects/QQTravel';
import { TravelListObject } from 'src/app/objects/LOV/travelList';

export interface QuickQuoteResultDTO {
  label: string;
  compre: string;
  ctpl: string;
  autoCompre: string;
  autoComprePlus: string;
  autoLiabilityRegular: string;
  autoLiabilitySelect: string;
  autoSelect: string;
}

@Component({
  selector: 'app-quick-quotation-travel',
  templateUrl: './quick-quotation-travel.component.html',
  styleUrls: ['./quick-quotation-travel.component.css']
})
export class QuickQuotationTravelComponent implements OnInit, AfterViewChecked {
  @Input() travelDetails = new QQTravel();
  option: string = '';
  quickQuoteForm: FormGroup;

  mindate: Date = new Date();
  endDateMinDate: Date = moment().add(1, 'days').toDate();
  enableEndDate: boolean = false;

  displayedColumns: string[] = ['label', 'compre', 'ctpl', 'autoCompre'];

  LOV = new TravelListObject();

  constructor(
    private fb: FormBuilder,
    // private qq: QuickQuoteService,
    // private lov: LovService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.createQuickQuoteForm();
    this.setValidations();
  }

  annualData: Array < QuickQuoteResultDTO > = [];
  plan30Data: Array < QuickQuoteResultDTO > = [];
  plan60Data: Array < QuickQuoteResultDTO > = [];
  plan90Data: Array < QuickQuoteResultDTO > = [];
  coveragelist: Array < QuickQuoteResultDTO > = [];

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
    this.LOV.currencyLOV = [{
      value: "1",
      name: "test"
    }];
  }

  getCountry() {
    this.LOV.countryLOV = [{
        id: 1,
        name: 'Mumbai',
        type: 'asia'
      },
      {
        id: 2,
        name: 'Bangaluru',
        type: 'asia'
      },
      {
        id: 3,
        name: 'Pune',
        type: 'asia'
      },
      {
        id: 4,
        name: 'Navsari',
        type: 'asia'
      },
      {
        id: 5,
        name: 'New Delhi',
        type: 'asia'
      }
    ];
  }

  getPackage() {
    this.LOV.packageLOV = [{
      value: "1",
      name: "test"
    }];
  }

  getCoverage() {
    this.LOV.coverageLOV = [{
      value: "1",
      name: "test"
    }];
  }

  getPurposeTrip() {
    this.LOV.purposeOfTripLOV = [{
      value: "1",
      name: "test"
    }];
  }

  getAgeRange() {
    this.LOV.ageRangeLOV = [{
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

    this.quickQuoteForm.get('country').valueChanges.subscribe(countries => {
      // alert(countries);
    });
  }

  quickQuote(travelDetails: QQTravel) {
    console.log(travelDetails);
  }

}
