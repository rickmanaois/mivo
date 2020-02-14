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
  Validators,
  FormArray
} from '@angular/forms';
import * as moment from 'moment';
import {
  QuoteTravel
} from '../../objects/QuoteTravel';
import {
  GroupPolicy
} from 'src/app/objects/GroupPolicy';
import {
  Validate
} from '../../validators/validate';
import {
  GroupPolicyLOV as lovUtil
} from '../../utils/lov/groupPolicy';
import {
  Utility
} from '../../utils/utility';
import { TravelListObject } from 'src/app/objects/LOV/travelList';
import { GroupPolicyListObject } from 'src/app/objects/LOV/groupPolicyList';


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

  LOV = new TravelListObject();
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
    this.getCountry();
    this.getCurrency();

    this.getPackage();
    this.getType();
    this.getPurposeTrip();
    this.getOneTrip();

    this.getRelationship();

    this.GPLOV.groupPolicyLOV = lovUtil.getGroupPolicy();
    this.GPLOV.contractLOV = lovUtil.getContract();
    this.GPLOV.subContractLOV = lovUtil.getSubContract();
    this.GPLOV.commercialStructureLOV = lovUtil.getCommercialStructure();

    this.getTravelInsurance();
    this.getOptionPack();
    this.getMedicalExpenses();
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
      travellers: this.fb.array([this.newTraveller()]),
      //additional policy information
      cbSportsEquipment: [null],
      sportsEquipment: [null],
      cbHazardousSports: [null],
      hazardousSports: [null],
      //coverages
      travelInsurance: ['', Validators.required],
      optionPack: ['', Validators.required],
      medicalExpenses: ['', Validators.required],
    });
  }

  setValidations() {
    var endDate = this.quoteForm.get('endDate');
    var startDate = this.quoteForm.get('startDate');

    var cbSportsEquipment = this.quoteForm.get('cbSportsEquipment');
    var sportsEquipment = this.quoteForm.get('sportsEquipment');
    var cbHazardousSports = this.quoteForm.get('cbHazardousSports');
    var hazardousSports = this.quoteForm.get('hazardousSports');

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

    cbSportsEquipment.valueChanges.subscribe(checked => {
      this.travelDetails.sportsEquipment = Utility.setNull(checked, this.travelDetails.sportsEquipment);
      Utility.updateValidator(sportsEquipment, checked ? [Validators.required] : null);
    });

    cbHazardousSports.valueChanges.subscribe(checked => {
      this.travelDetails.hazardousSports = Utility.setNull(checked, this.travelDetails.hazardousSports);
      Utility.updateValidator(hazardousSports, checked ? [Validators.required] : null);
    });

    Validate.setGroupPolicyValidations(this.quoteForm, this.groupPolicy);
  }

  travellers(): FormArray {
    return this.quoteForm.get("travellers") as FormArray
  }

  newTraveller(): FormGroup {
    return this.fb.group({
      completeName: ['', Validators.required],
      birthDate: ['', Validators.required],
      relationship: ['', Validators.required],
      passportNumber: ['', Validators.required],
      physicianName: [null],
    });
  }

  addTraveller() {
    this.travellers().push(this.newTraveller());
  }

  removeTraveller(index: number) {
    this.travellers().removeAt(index);
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
    this.LOV.travelPackageLOV = [{
      value: "1",
      name: "test"
    }];
  }

  getType() {
    this.LOV.travelTypeLOV = [{
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

  getOneTrip() {
    this.LOV.oneTripOnlyLOV = [{
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

  getTravelInsurance() {
    this.LOV.travelInsuranceLOV = [{
      value: "1",
      name: "test"
    }];
  }

  getOptionPack() {
    this.LOV.optionPackLOV = [{
      value: "1",
      name: "test"
    }];
  }

  getMedicalExpenses() {
    this.LOV.medicalExpensesLOV = [{
      value: "1",
      name: "test"
    }];
  }

  issueQuote(travelDetails: QuoteTravel, groupPolicy: GroupPolicy) {
    var check = new QuoteTravel(this.quoteForm.value);
    console.log(check);
    console.log(travelDetails, groupPolicy);
  }

}
