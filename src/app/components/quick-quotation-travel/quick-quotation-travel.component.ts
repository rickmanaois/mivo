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
  selector: 'app-quick-quotation-travel',
  templateUrl: './quick-quotation-travel.component.html',
  styleUrls: ['./quick-quotation-travel.component.css']
})
export class QuickQuotationTravelComponent implements OnInit, AfterViewChecked {
  @Input() travelDetails = new QQTravel();
  option: string = '';
  quickQuoteForm: FormGroup;

  mindate = new Date();
  enableEndDate: boolean = false;

  currencyLOV: any[];
  packageLOV: any[];
  coverageLOV: any[];
  purposeTripLOV: any[];
  ageRangeLOV: any[];

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
  }

  createQuickQuoteForm() {
    this.quickQuoteForm = this.fb.group({
      quickCurrency: ['', Validators.required],
      quickPackage: ['', Validators.required],
      quickCoverage: ['', Validators.required],
      quickPurposeTrip: ['', Validators.required],
      quickStartDate: ['', Validators.required],
      quickEndDate: ['', Validators.required],
      quickNoOfDays: ['', Validators.required],
      quickAgeRange: ['', Validators.required]
    });
  }

  getCurrency() {
    this.currencyLOV = [{
      value: "1",
      name: "test"
    }];
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
    this.quickQuoteForm.get('quickEndDate').valueChanges.subscribe(date => {
      var diff = (date - this.quickQuoteForm.get('quickStartDate').value) / 1000 / 60 / 60 / 24;
      if (diff === NaN) {
        diff = 0;
      }
      this.travelDetails.noOfDays = diff > 0 ? diff : 0;
    });

    this.quickQuoteForm.get('quickStartDate').valueChanges.subscribe(date => {
      this.enableEndDate = date !== null && date !== undefined;
      if (!this.enableEndDate) {
        this.travelDetails.endDate = null;
      }
    });
  }

  quickQuote(travelDetails: QQTravel) {
    console.log(travelDetails);
  }

}
