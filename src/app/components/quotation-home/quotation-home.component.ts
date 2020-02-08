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
  QuoteHome
} from '../../objects/QuoteHome';
import {
  Utility
} from '../../utils/utility';

@Component({
  selector: 'app-quotation-home',
  templateUrl: './quotation-home.component.html',
  styleUrls: ['./quotation-home.component.css']
})
export class QuotationHomeComponent implements OnInit, AfterViewChecked {
  @Input() homeDetails = new QuoteHome();
  quoteForm: FormGroup;
  mindate : Date = new Date();
  expiryDateMinDate : Date = moment().add(1, 'years').toDate();

  sublineLOV: any[];

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
    this.getSubline();
  }

  createquoteForm() {
    this.quoteForm = this.fb.group({
      businessLine: ['', Validators.required],
      currency: ['', Validators.required],
      buildingNumber: [null],
      subdivision: [null],
      buildingName: [null],
      streetName: [null],
      barangay: [null],
      region: ['', Validators.required],
      province: ['', Validators.required],
      municipality: ['', Validators.required],
      //building / content details
      buildingCapital: ['', Validators.required],
      contentValue: ['', Validators.required],
      constructionOfBuilding: ['', Validators.required],
      occupancyOfBuilding: ['', Validators.required],
      front: ['', Validators.required],
      right: ['', Validators.required],
      left: ['', Validators.required],
      rear: ['', Validators.required],
      // policy holder information
      clientName: [null],
      //general information
      groupPolicy: ['', Validators.required],
      contract: [null],
      subContract: [null],
      commercialStructure: ['', Validators.required],
      agentCode: ['', Validators.required],
      isRenewal: [null],
      expiringPolicyNumber: [null],
      //movement dates
      effectivityDate: ['', Validators.required],
      expiryDate: ['', Validators.required],
      //product data
      paymentMethod: ['', Validators.required],
      product: ['', Validators.required],
    });
  }

  setValidations() {
    this.quoteForm.get('effectivityDate').valueChanges.subscribe(date => {
      this.homeDetails.expiryDate = moment(date).add(1, 'years').toDate();
      this.expiryDateMinDate = this.homeDetails.expiryDate;
    });
  }

  getSubline() {
    this.sublineLOV = [{
      value: "test",
      name: "test"
    }];
  }

  quickQuote(homeDetails: QuoteHome) {
    console.log(homeDetails);
  }
}
