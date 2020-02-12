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
  GroupPolicy
} from 'src/app/objects/GroupPolicy';
import {
  Validate
} from '../../validators/validate';
import {
  LOV as lovUtil
} from '../../utils/lov';

@Component({
  selector: 'app-quotation-home',
  templateUrl: './quotation-home.component.html',
  styleUrls: ['./quotation-home.component.css']
})
export class QuotationHomeComponent implements OnInit, AfterViewChecked {
  @Input() homeDetails = new QuoteHome();
  @Input() groupPolicy = new GroupPolicy();

  quoteForm: FormGroup;
  mindate: Date = new Date();
  expiryDateMinDate: Date = moment().add(1, 'years').toDate();

  sublineLOV: any[];
  currencyLOV: any[];
  regionLOV: any[];
  provinceLOV: any[];
  municipalityLOV: any[];

  groupPolicyLOV: any[];
  contractLOV: any[];
  subContractLOV: any[];
  commercialStructureLOV: any[];

  paymentMethodLOV: any[];
  productListLOV: any[];

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
    this.getCurrency();
    this.getRegion();
    this.getProvince();
    this.getMunicipality();
    this.getPaymentMethod();
    this.getProductList();

    this.groupPolicyLOV = lovUtil.getGroupPolicy();
    this.contractLOV = lovUtil.getContract();
    this.subContractLOV = lovUtil.getSubContract();
    this.commercialStructureLOV = lovUtil.getCommercialStructure();
  }

  createQuoteForm() {
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
      //group policy
      groupPolicy: ['', Validators.required],
      contract: [null],
      subContract: [null],
      commercialStructure: ['', Validators.required],
      agentCode: ['', Validators.required],
      cbIsRenewal: [null],
      expiringPolicyNumber: [null],
      //general information
      effectivityDate: ['', Validators.required],
      expiryDate: ['', Validators.required],
      //product data
      paymentMethod: ['', Validators.required],
      productList: ['', Validators.required],
    });
  }

  setValidations() {
    Validate.setGroupPolicyValidations(this.quoteForm, this.groupPolicy);
    Validate.setEffecivityDateValidations(this.quoteForm, this.homeDetails, this.expiryDateMinDate);
  }

  getSubline() {
    this.sublineLOV = [{
      value: 1,
      name: "test"
    }];
  }

  getCurrency() {
    this.currencyLOV = [{
      value: 1,
      name: "test"
    }];
  }

  getRegion() {
    this.regionLOV = [{
      value: 1,
      name: "test"
    }];
  }

  getProvince() {
    this.provinceLOV = [{
      value: 1,
      name: "test"
    }];
  }

  getMunicipality() {
    this.municipalityLOV = [{
      value: 1,
      name: "test"
    }];
  }

  getPaymentMethod() {
    this.paymentMethodLOV = [{
      value: 1,
      name: "test"
    }];
  }

  getProductList() {
    this.productListLOV = [{
      value: 1,
      name: "test"
    }];
  }

  issueQuote(homeDetails: QuoteHome, groupPolicy: GroupPolicy) {
    console.log(homeDetails, groupPolicy);
  }
}
