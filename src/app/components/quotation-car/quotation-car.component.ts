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
  QuickQuoteService
} from '../../services/quickqoute.service'
import {
  Utility
} from '../../utils/utility';
import {
  GroupPolicyLOV as lovUtil
} from '../../utils/lov/groupPolicy';
import {
  Validate
} from '../../validators/validate';
import {
  CarLOVServices
} from '../../services/lov/car.service'
import {
  CarListObject
} from 'src/app/objects/LOV/carList';
import {
  GroupPolicyListObject
} from 'src/app/objects/LOV/groupPolicyList';
import { QQCar } from 'src/app/objects/QQCar';

@Component({
  selector: 'app-quotation-car',
  templateUrl: './quotation-car.component.html',
  styleUrls: ['./quotation-car.component.css']
})
export class QuotationCarComponent implements OnInit, AfterViewChecked {
  @Input() carDetails = new QuoteCar();
  @Input() groupPolicy = new GroupPolicy();
  quoteForm: FormGroup;
  today: Date = new Date();
  expiryDateMinDate: Date = moment().add(1, 'years').toDate();

  LOV = new CarListObject();
  GPLOV = new GroupPolicyListObject();

  showQuickQouteDetails: boolean = false;

  constructor(
    private fb: FormBuilder,
    private qq: QuickQuoteService,
    private carlov: CarLOVServices,
    private changeDetector: ChangeDetectorRef
  ) {
    this.createQuoteForm();
    this.setValidations();
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  ngOnInit() {
    var _this = this;
    this.carlov.getMakeList().then(res => {
      _this.LOV.makeLOV = res;
    });

    this.getColor();
    this.getAreaOfUsage();

    this.getAccessoryList();

    this.GPLOV.groupPolicyLOV = lovUtil.getGroupPolicy();
    this.GPLOV.contractLOV = lovUtil.getContract();
    this.GPLOV.subContractLOV = lovUtil.getSubContract();
    this.GPLOV.commercialStructureLOV = lovUtil.getCommercialStructure();

    this.getPaymentMethod();
    this.getProductList();

    this.getSubagent();

    this.setValue();
  }

  setValue() {
    this.carDetails.color = 'test';
    this.carDetails.receivedBy = 'MIV01101'
    this.carDetails.purchaseDate = this.today;
    this.carDetails.receivedDate = this.today;
    
    this.groupPolicy.agentCode = '1101';

    this.carDetails.effectivityDate = this.today;
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
      //group policy
      groupPolicy: [null],
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
      product: ['', Validators.required],
      //subagent
      subagent: [null],
    });
  }

  async validateConductionNumber(control: AbstractControl) {
    if (!Utility.isUndefined(control.value)) {
      this.carDetails.conductionNumber = control.value;
      return this.qq.validateConductionNumberFormat(this.carDetails).then(res => {
        return res.status && res.obj["valid"] ? null : {
          invalidConductionNumber: true
        };
      });
    }
  }

  async validatePlateNumber(control: AbstractControl) {
    if (!Utility.isUndefined(control.value)) {
      this.carDetails.plateNumber = control.value;
      return this.qq.validatePlateNumberFormat(this.carDetails).then(res => {
        return res.status && res.obj["valid"] ? null : {
          invalidPlateNumber: true
        };
      });
    }
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

    Validate.setGroupPolicyValidations(this.quoteForm, this.groupPolicy);
    Validate.setEffecivityDateValidations(this.quoteForm, this.carDetails, this.expiryDateMinDate);
  }

  accessory(): FormArray {
    return this.quoteForm.get("accessories") as FormArray
  }

  newAccessory(): FormGroup {
    return this.fb.group({
      accessoryList: ['', Validators.required],
      accessoryType: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  addAccessory() {
    this.accessory().push(this.newAccessory());
  }

  removeAccessory(index: number) {
    this.accessory().removeAt(index);
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

    if (this.carDetails.vehicleType != '') {
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
    this.qq.getFMV(qqDetails).then(res => {
      _this.carDetails.vehicleValue = res.obj["fmv"];
    });
  }

  getSubline() {
    const _this = this;
    var qqDetails = new QQCar;
    qqDetails.vehicleType = this.carDetails.vehicleType;
    qqDetails.typeOfUse = this.carDetails.typeOfUse;
    this.qq.getSubline(qqDetails).then(res => {
      _this.LOV.sublineLOV = res.obj["list"];
    });
  }

  validatePlateNumberFormat() {
    this.qq.validatePlateNumberFormat(this.carDetails).then(res => {
      alert(res.obj["valid"]);
    });
  }

  getColor() {
    this.LOV.colorLOV = [{
      value: "test",
      name: "test"
    }];
  }

  getAreaOfUsage() {
    this.LOV.areaOfUsageLOV = [{
      value: "test",
      name: "test"
    }];
  }

  getAccessoryList() {
    this.LOV.accessoryListLOV = [{
      value: "1",
      name: "test"
    }];
  }

  getPaymentMethod() {
    this.LOV.paymentMethodLOV = [{
      value: 1,
      name: "test"
    }];
  }

  getProductList() {
    this.LOV.productListLOV = [{
      value: 1,
      name: "test"
    }];
  }

  getSubagent() {
    this.LOV.subagentLOV = [{
        value: 1,
        name: 'Subagent1'
      },
      {
        value: 2,
        name: 'Subagent2'
      },
      {
        value: 3,
        name: 'Subagent3'
      },
      {
        value: 4,
        name: 'Subagent4'
      },
      {
        value: 5,
        name: 'Subagent5'
      }
    ];
  }

  issueQuote(carDetails: QuoteCar, groupPolicy: GroupPolicy) {
    console.log(carDetails, groupPolicy);
  }

}
