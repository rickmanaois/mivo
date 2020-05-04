import {
  Component,
  OnInit,
  AfterViewChecked,
  ChangeDetectorRef,
  Input
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  AbstractControl
} from '@angular/forms';
import * as moment from 'moment';
import {
  distinctUntilChanged
} from 'rxjs/operators';
import {
  QuoteCar
} from '../../objects/QuoteCar';
import {
  GroupPolicy
} from 'src/app/objects/GroupPolicy';
import {
  Utility
} from '../../utils/utility';
import {
  CarLOVServices
} from '../../services/lov/car.service';
import {
  CarUtilityServices
} from '../../services/car-utility.service';
import {
  CarQuoteServices
} from '../../services/car-quote.service';
import {
  CarListObject
} from 'src/app/objects/LOV/carList';
import {
  GroupPolicyListObject
} from 'src/app/objects/LOV/groupPolicyList';
import {
  QQCar
} from 'src/app/objects/QQCar';
import {
  AuthenticationService
} from '../../services/authentication.service';

@Component({
  selector: 'app-quotation-car',
  templateUrl: './quotation-car.component.html',
  styleUrls: ['./quotation-car.component.css']
})
export class QuotationCarComponent implements OnInit, AfterViewChecked {
  currentUser = this.authenticationService.currentUserValue;
  @Input() isIssuance: boolean = false;
  pageLabel: String = 'Quotation';

  carDetails = new QuoteCar();
  groupPolicy = new GroupPolicy();
  quoteForm: FormGroup;
  today: Date = new Date();
  expiryDateMinDate: Date = moment().add(1, 'years').toDate();

  LOV = new CarListObject();
  GPLOV = new GroupPolicyListObject();

  showQuickQouteDetails: boolean = false;

  showAccessories: boolean = false;
  showAdditionalInformation: boolean = false;
  showSubAgent: boolean = false;

  constructor(
    private fb: FormBuilder,
    private cu: CarUtilityServices,
    private carlov: CarLOVServices,
    private quote: CarQuoteServices,
    private changeDetector: ChangeDetectorRef,
    private authenticationService: AuthenticationService
  ) {
    // this.createQuoteForm();
    // this.setValidations();
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  ngOnInit() {
    this.createQuoteForm();
    this.setValidations();

    if (this.isIssuance) {
      this.pageLabel = 'Issuance';
    }

    var _this = this;

    this.carlov.getMakeList().then(res => {
      _this.LOV.makeLOV = res;
    });

    this.carlov.getColor().then(res => {
      _this.LOV.colorLOV = res;
    });

    this.carlov.getClassification().then(res => {
      _this.LOV.classificationLOV = res;
    });

    this.carlov.getCoverageArea().then(res => {
      _this.LOV.coverageAreaLOV = res;
    });

    this.carlov.getInspectionAssessment().then(res => {
      _this.LOV.inspectionAssessmentLOV = res;
    });

    this.cu.getSubagents().then(res => {
      var subAgents = res.obj["subAgents"];
      subAgents.forEach(subAgent => {
        subAgent.name = subAgent.nomCompleto + "(" + subAgent.tipDocum + ")";
        subAgent.value = subAgent.codDocum;
      });
      _this.LOV.subagentLOV = subAgents;
    });

    this.setValue();
  }

  setValue() {
    //setting default value
    this.carDetails.color = 9999; // undeclared
    this.carDetails.receivedBy = this.currentUser.username; //TODO
    this.carDetails.purchaseDate = this.today; // current today
    this.carDetails.receivedDate = this.today; // current today
    this.carDetails.effectivityDate = this.today; // current today
  }

  createQuoteForm() {
    this.quoteForm = this.fb.group({
      //risk details
      make: ['', Validators.required],
      model: ['', Validators.required],
      vehicleType: ['', Validators.required],
      modelYear: ['', Validators.required],
      subModel: ['', Validators.required],
      typeOfUse: ['', Validators.required],
      subline: ['', Validators.required],
      vehicleValue: ['', Validators.required],
      //vehicle information
      color: ['', Validators.required],
      areaOfUsage: ['', Validators.required],
      conductionNumber: ['', Validators.required, this.validateConductionNumber.bind(this)],
      plateNumber: ['', Validators.required, this.validatePlateNumber.bind(this)],
      serialNumber: ['', Validators.required],
      engineNumber: ['', Validators.required],
      mvFileNumber: [null],
      purchaseDate: [null],
      receivedBy: ['', Validators.required],
      receivedDate: ['', Validators.required],
      //travellers
      accessories: this.fb.array([]),
      //policy holder information
      clientName: ['', Validators.required],

      effectivityDate: ['', Validators.required],
      expiryDate: ['', Validators.required],
      //additional policy information
      customerRiskName: [null],
      seatingCapacity: [null],
      weight: [null],
      displacement: [null],
      classification: [null],
      coverageArea: [null],
      assuredsCoinsuranceShare: [null],
      cbWaivedMinPremium: [null],
      cbPrepaidPremium: [null],
      cbGlassEtchingEntitled: [null],
      glassEtchingAvailmentDate: [null],
      existingDamages: [null],
      inspectionAssessment: [null],
      //product data
      paymentMethod: ['', Validators.required],
      product: ['', Validators.required],
      //subagent
      subAgent: [null],
    });
  }

  async validateConductionNumber(control: AbstractControl) {
    if (!Utility.isUndefined(control.value)) {
      this.carDetails.conductionNumber = control.value;
      return this.cu.validateConductionNumberFormat(this.carDetails).then(res => {
        return res.status && res.obj["valid"] ? null : {
          invalidConductionNumber: true
        };
      });
    }
  }

  async validatePlateNumber(control: AbstractControl) {
    if (!Utility.isUndefined(control.value)) {
      this.carDetails.plateNumber = control.value;
      return this.cu.validatePlateNumberFormat(this.carDetails).then(res => {
        return res.status && res.obj["valid"] ? null : {
          invalidPlateNumber: true
        };
      });
    }
  }

  loadQuotation() {

  }

  setValidations() {
    var conductionNumber = this.quoteForm.get('conductionNumber');
    var plateNumber = this.quoteForm.get('plateNumber');

    conductionNumber.valueChanges.pipe(distinctUntilChanged()).subscribe(number => {
      Utility.updateValidator(plateNumber, !Utility.isUndefined(number) ? null : Validators.required);
    });

    plateNumber.valueChanges.pipe(distinctUntilChanged()).subscribe(number => {
      Utility.updateValidator(conductionNumber, !Utility.isUndefined(number) ? null : Validators.required);
    });
  }

  accessory(): FormArray {
    return this.quoteForm.get("accessories") as FormArray
  }

  newAccessory(): FormGroup {
    return this.fb.group({
      accessory: ['', Validators.required],
      accessoryType: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  addAccessory() {
    this.disableAccessory();
    this.accessory().push(this.newAccessory());
  }

  removeAccessory(index: number) {
    this.accessory().removeAt(index);
    this.disableAccessory();
  }

  disableAccessory() {
    var accessories = this.quoteForm.get('accessories').value;
    if (accessories.length > 0) {
      var temp = [];
      accessories.forEach(accessory => {
        temp.push(accessory.accessory);
      });
      this.LOV.accessoryListLOV.forEach(accessory => {
        accessory.disabled = temp.indexOf(accessory.COD_ACCESORIO) !== -1;
      });
    }
  }

  removeAccessories() {
    // removing all accessories
    var accessories = this.quoteForm.get('accessories').value;
    if (accessories.length > 0) {
      // loop until all accessories removed
      this.accessory().removeAt(0);
      this.removeAccessories();
    }
  }

  clearRiskDetails(level: number, type ? : boolean) {
    if (level <= 1) { //if user changes car make
      this.LOV.modelLOV = [];
      this.carDetails.model = undefined;
      this.quoteForm.get('model').reset();
    }
    if (level <= 2) { //if user changes car model
      this.LOV.vehicleTypeLOV = [];
      this.carDetails.vehicleType = undefined;
      this.quoteForm.get('vehicleType').reset();
    }
    if (level <= 3) { //if user changes vehicle type
      this.LOV.modelYearLOV = [];
      this.carDetails.modelYear = undefined;
      this.quoteForm.get('modelYear').reset();
    }
    if (level <= 4) { //if user changes car model year
      this.LOV.subModelLOV = [];
      this.LOV.typeOfUseLOV = [];
      this.carDetails.subModel = undefined;
      this.carDetails.typeOfUse = undefined;
      this.quoteForm.get('subModel').reset();
      this.quoteForm.get('typeOfUse').reset();
    }
    if (level <= 5) { //if user changes car sub model or type of use
      this.removeAccessories();
      if (level == 5) {
        if (type) {
          //if user changes type of use
          this.LOV.sublineLOV = [];
          this.carDetails.subline = undefined;
          this.quoteForm.get('subline').reset();
        } else {
          //if user changes sub model
          this.carDetails.vehicleValue = undefined;
          this.quoteForm.get('vehicleValue').reset();
        }
      } else {
        //if level is below 5, subline and vehicle value will reset
        this.LOV.sublineLOV = [];
        this.carDetails.subline = undefined;
        this.carDetails.vehicleValue = undefined;
        this.quoteForm.get('subline').reset();
        this.quoteForm.get('vehicleValue').reset();
      }
    }
  }

  makeOnchange() {
    const _carDetails = this.carDetails;
    this.clearRiskDetails(1);
    this.carDetails.make = _carDetails.make;

    var _this = this;
    this.carlov.getModelList(this.carDetails).then(res => {
      _this.LOV.modelLOV = res;
    });
  }

  modelOnchange() {
    const _carDetails = this.carDetails;
    this.clearRiskDetails(2);
    this.carDetails.make = _carDetails.make;

    var _this = this;
    this.carlov.getVehicleTypeList(this.carDetails).then(res => {
      _this.LOV.vehicleTypeLOV = res;
    });
  }

  vehicleTypeOnchange() {
    const _carDetails = this.carDetails;
    this.clearRiskDetails(3);
    this.carDetails.make = _carDetails.make;
    this.carDetails.model = _carDetails.model;

    if (this.carDetails.vehicleType > 0) {
      var _this = this;
      this.carlov.getModelYearList(this.carDetails).then(res => {
        _this.LOV.modelYearLOV = res;
      });
    }
  }

  modelYearOnchange() {
    const _carDetails = this.carDetails;
    this.clearRiskDetails(4);
    this.carDetails.make = _carDetails.make;
    this.carDetails.model = _carDetails.model;
    this.carDetails.vehicleType = _carDetails.vehicleType;

    if (this.carDetails.modelYear != '') {
      var _this = this;
      this.carlov.getSubModelList(this.carDetails).then(res => {
        _this.LOV.subModelLOV = res;
      });
      this.carlov.getTypeOfUseList(this.carDetails).then(res => {
        _this.LOV.typeOfUseLOV = res;
      });
    }
  }

  subModelOnchange() {
    const _carDetails = this.carDetails;
    this.clearRiskDetails(5, false);
    this.carDetails.make = _carDetails.make;
    this.carDetails.model = _carDetails.model;
    this.carDetails.vehicleType = _carDetails.vehicleType;
    this.carDetails.modelYear = _carDetails.modelYear;
    this.carDetails.typeOfUse = _carDetails.typeOfUse;
    this.carDetails.subline = _carDetails.subline;
    this.getVehicleValue();
  }

  typeOfUseOnchange() {
    const _carDetails = this.carDetails;
    this.clearRiskDetails(5, true);
    this.carDetails.make = _carDetails.make;
    this.carDetails.model = _carDetails.model;
    this.carDetails.vehicleType = _carDetails.vehicleType;
    this.carDetails.modelYear = _carDetails.modelYear;
    this.carDetails.subModel = _carDetails.subModel;
    this.carDetails.vehicleValue = _carDetails.vehicleValue;
    this.getSubline();
  }

  getVehicleValue() {
    const _this = this;
    var qqDetails = new QQCar;
    qqDetails.make = this.carDetails.make;
    qqDetails.model = this.carDetails.model;
    qqDetails.subModel = this.carDetails.subModel;
    qqDetails.modelYear = this.carDetails.modelYear;
    this.cu.getFMV(qqDetails).then(res => {
      _this.carDetails.vehicleValue = res.obj["fmv"];
    });
  }

  getSubline() {
    const _this = this;
    var qqDetails = new QQCar;
    qqDetails.vehicleType = this.carDetails.vehicleType;
    qqDetails.typeOfUse = this.carDetails.typeOfUse;
    this.cu.getSubline(qqDetails).then(res => {
      _this.LOV.sublineLOV = res.obj["list"];
    });
  }

  sublineOnchange(event: any) {
    var options = event.target.options;
    if (options.length) {
      //effectivity date is based on selected subline
      var selectedIndex = event.target.options.selectedIndex;
      var effectivityDate = event.target.options[selectedIndex].dataset.sublinedate;

      //effectivity date change format
      var d = moment(effectivityDate, 'DDMMYYYY').format('MMDDYYYY');
      this.carDetails.sublineEffectivityDate = d.toString();
    }

    const _this = this;
    this.carlov.getAreaOfUsage(this.carDetails).then(res => {
      _this.LOV.areaOfUsageLOV = res;
    });

    this.carlov.getAccessoryList(this.carDetails).then(res => {
      _this.LOV.accessoryListLOV = res;
    });
    this.removeAccessories();

    this.carlov.getPaymentPlan(this.carDetails).then(res => {
      _this.LOV.paymentMethodLOV = res;
    });
    this.carlov.getProduct(this.carDetails).then(res => {
      _this.LOV.productListLOV = res;
    });
  }

  effectivityDateOnChange() {
    this.carDetails.expiryDate = moment(this.carDetails.effectivityDate).add(1, 'years').toDate();
    this.expiryDateMinDate = this.carDetails.expiryDate;
  }

  accessoryOnchange(event: any, index) {
    this.disableAccessory();
    var options = event.target.options;
    if (options.length) {
      var selectedIndex = event.target.options.selectedIndex;
      var price = event.target.options[selectedIndex].dataset.price;
      var type = event.target.options[selectedIndex].dataset.type;

      this.accessory().at(index).get('accessoryType').setValue(type == 'A' ? 'Additional' : type == 'B' ? 'Built-In' : 'Free');
      this.accessory().at(index).get('price').setValue(price);
    }
  }

  test(carDetails: QuoteCar, groupPolicy: GroupPolicy) {
    var accessories = this.quoteForm.get('accessories').value;
    carDetails.accessories = accessories.length ? accessories : [];

    this.quoteForm.get('accessories').value;
    console.log('carDetails', carDetails);
    console.log('groupPolicy', groupPolicy);
  }

  issueQuote(carDetails: QuoteCar, groupPolicy: GroupPolicy) {
    this.quote.getCoverageByProduct(carDetails).then(res => {
      console.log('res', res);
    });
  }

}
