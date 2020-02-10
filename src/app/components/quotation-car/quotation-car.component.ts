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
  LovService
} from '../../services/lov.service'
import {
  LOV
} from '../../objects/LOV';
import {
  Utility
} from '../../utils/utility';
import {
  LOV as lovUtil
} from '../../utils/lov';
import {
  setGroupPolicyValidations,
  setEffecivityDateValidations
} from '../../validators/validate';

@Component({
  selector: 'app-quotation-car',
  templateUrl: './quotation-car.component.html',
  styleUrls: ['./quotation-car.component.css']
})
export class QuotationCarComponent implements OnInit, AfterViewChecked {
  @Input() carDetails = new QuoteCar();
  @Input() groupPolicy = new GroupPolicy();
  quoteForm: FormGroup;
  mindate: Date = new Date();
  expiryDateMinDate: Date = moment().add(1, 'years').toDate();

  makeLOV: any[];
  modelLOV: any[];
  vehicleTypeLOV: any[];
  modelYearLOV: any[];
  subModelLOV: any[];
  typeOfUseLOV: any[];
  sublineLOV: any[];

  colorLOV: any[];
  areaOfUsageLOV: any[];

  groupPolicyLOV: any[];
  contractLOV: any[];
  subContractLOV: any[];
  commercialStructureLOV: any[];

  paymentMethodLOV: any[];
  productListLOV: any[];

  showQuickQouteDetails: boolean = false;

  constructor(
    private fb: FormBuilder,
    private qq: QuickQuoteService,
    private lov: LovService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.createQuoteForm();
    this.setValidations();
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  ngOnInit() {
    this.getMakeList();
    this.getColor();
    this.getAreaOfUsage();

    this.groupPolicyLOV = lovUtil.getGroupPolicy();
    this.contractLOV = lovUtil.getContract();
    this.subContractLOV = lovUtil.getSubContract();
    this.commercialStructureLOV = lovUtil.getCommercialStructure();
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
      conductionNumber: ['', Validators.required],
      plateNumber: ['', Validators.required],
      serialNumber: [null],
      engineNumber: [null],
      mvFileNumber: [null],
      purchaseDate: [null],
      receivedBy: ['', Validators.required],
      receivedDate: [null],
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
    });
  }

  setValidations() {
    var conductionNumber = this.quoteForm.get('conductionNumber');
    var plateNumber = this.quoteForm.get('plateNumber');

    conductionNumber.valueChanges.subscribe(number => {
      if (number != undefined) {
        var hasNumber = number !== null && number !== '';
        Utility.updateValidator(plateNumber, hasNumber ? null : Validators.required);
      }
    });

    plateNumber.valueChanges.pipe(distinctUntilChanged()).subscribe(number => {
      if (number != undefined) {
        var hasNumber = number !== null && number !== '';
        Utility.updateValidator(conductionNumber, hasNumber ? null : Validators.required);
      }
    });

    setGroupPolicyValidations(this.quoteForm, this.groupPolicy);

    setEffecivityDateValidations(this.quoteForm, this.carDetails, this.expiryDateMinDate);
  }

  getMakeList() {
    // const dto = new LOV('A2100400', '3', 'COD_CIA~1');
    // const _this = this;
    // this.lov.getLOV(dto).then(lovs => {
    //   _this.makeLOV = lovs;
    // });
  }

  makeOnchange() {
    this.modelLOV = [];
    this.vehicleTypeLOV = [];
    this.modelYearLOV = [];
    this.subModelLOV = [];
    this.typeOfUseLOV = [];
    this.sublineLOV = [];

    const _carDetails = this.carDetails;
    this.carDetails = new QuoteCar();
    this.carDetails.make = _carDetails.make;
    this.getModelList();
  }

  getModelList() {
    const dto = new LOV(
      'A2100410',
      '4',
      '|COD_MARCA~' + this.carDetails.make +
      '|NUM_COTIZACION~1|COD_CIA~1');
    const _this = this;
    this.lov.getLOV(dto).then(lovs => {
      _this.modelLOV = lovs;
    });
  }

  modelOnchange() {
    this.vehicleTypeLOV = [];
    this.modelYearLOV = [];
    this.subModelLOV = [];
    this.typeOfUseLOV = [];
    this.sublineLOV = [];

    const _carDetails = this.carDetails;
    this.carDetails = new QuoteCar();
    this.carDetails.make = _carDetails.make;
    this.carDetails.model = _carDetails.model;
    this.getVehicleTypeList();
  }

  getVehicleTypeList() {
    const dto = new LOV(
      'A2100100',
      '2',
      '|COD_MARCA~' + this.carDetails.make +
      '|COD_MODELO~' + this.carDetails.model +
      '|NUM_COTIZACION~1|COD_CIA~1');
    const _this = this;
    this.lov.getLOV(dto).then(lovs => {
      _this.vehicleTypeLOV = lovs;
    });
  }

  vehicleTypeOnchange() {
    this.modelYearLOV = [];
    this.subModelLOV = [];
    this.typeOfUseLOV = [];
    this.sublineLOV = [];

    const _carDetails = this.carDetails;
    this.carDetails = new QuoteCar();
    this.carDetails.make = _carDetails.make;
    this.carDetails.model = _carDetails.model;
    this.carDetails.vehicleType = _carDetails.vehicleType;
    this.getModelYearList();
  }

  getModelYearList() {
    const dto = new LOV(
      'A2100430',
      '4',
      '|COD_MARCA~' + this.carDetails.make +
      '|COD_MODELO~' + this.carDetails.model +
      '|COD_TIP_VEHI~' + this.carDetails.vehicleType +
      '|NUM_COTIZACION~1|COD_CIA~1');
    const _this = this;
    this.lov.getLOV(dto).then(lovs => {
      _this.modelYearLOV = lovs;
    });
  }

  modelYearOnchange() {
    this.subModelLOV = [];
    this.typeOfUseLOV = [];
    this.sublineLOV = [];

    const _carDetails = this.carDetails;
    this.carDetails = new QuoteCar();
    this.carDetails.make = _carDetails.make;
    this.carDetails.model = _carDetails.model;
    this.carDetails.vehicleType = _carDetails.vehicleType;
    this.carDetails.modelYear = _carDetails.modelYear;
    this.getSubModelList();
    this.getTypeOfUseList();
  }

  getSubModelList() {
    const dto = new LOV(
      'A2100420',
      '4',
      '|COD_MARCA~' + this.carDetails.make +
      '|COD_MODELO~' + this.carDetails.model +
      '|COD_TIP_VEHI~' + this.carDetails.vehicleType +
      '|ANIO_SUB_MODELO~' + this.carDetails.modelYear +
      '|NUM_COTIZACION~1|COD_CIA~1');
    const _this = this;
    this.lov.getLOV(dto).then(lovs => {
      _this.subModelLOV = lovs;
    });
  }

  getTypeOfUseList() {
    const dto = new LOV(
      'A2100200',
      '4',
      '|COD_MARCA~' + this.carDetails.make +
      '|COD_MODELO~' + this.carDetails.model +
      '|COD_TIP_VEHI~' + this.carDetails.vehicleType +
      '|ANIO_SUB_MODELO~' + this.carDetails.modelYear +
      '|NUM_COTIZACION~1|COD_CIA~1');
    const _this = this;
    this.lov.getLOV(dto).then(lovs => {
      _this.typeOfUseLOV = lovs;
    });
  }

  subModelOnchange() {
    const _carDetails = this.carDetails;
    this.carDetails = new QuoteCar();
    this.carDetails.make = _carDetails.make;
    this.carDetails.model = _carDetails.model;
    this.carDetails.vehicleType = _carDetails.vehicleType;
    this.carDetails.modelYear = _carDetails.modelYear;
    this.carDetails.subModel = _carDetails.subModel
    this.carDetails.typeOfUse = _carDetails.typeOfUse;
    this.carDetails.subline = _carDetails.subline;
    this.getVehicleValue();
  }

  typeOfUseOnchange() {
    const _carDetails = this.carDetails;
    this.carDetails = new QuoteCar();
    this.carDetails.make = _carDetails.make;
    this.carDetails.model = _carDetails.model;
    this.carDetails.vehicleType = _carDetails.vehicleType;
    this.carDetails.modelYear = _carDetails.modelYear;
    this.carDetails.subModel = _carDetails.subModel
    this.carDetails.typeOfUse = _carDetails.typeOfUse;
    this.carDetails.vehicleValue = _carDetails.vehicleValue;
    this.getSubline();
  }

  getVehicleValue() {
    const _this = this;
    this.qq.getFMV(this.carDetails).then(res => {
      _this.carDetails.vehicleValue = res.obj["fmv"];
    });
  }

  getSubline() {
    const _this = this;
    this.qq.getSubline(this.carDetails).then(res => {
      _this.sublineLOV = res.obj["list"];
    });
  }

  getColor() {
    this.colorLOV = [{
      value: "test",
      name: "test"
    }];
  }

  getAreaOfUsage() {
    this.areaOfUsageLOV = [{
      value: "test",
      name: "test"
    }];
  }

  getGroupPolicy() {
    this.groupPolicyLOV = [{
      value: "test",
      name: "test"
    }];
  }

  getContract() {
    this.contractLOV = [{
      value: "test",
      name: "test"
    }];
  }

  getSubContract() {
    this.subContractLOV = [{
      value: "test",
      name: "test"
    }];
  }

  getCommercialStructure() {
    this.commercialStructureLOV = [{
      value: "test",
      name: "test"
    }];
  }

  getPaymentMethod() {
    this.paymentMethodLOV = [{
      value: "test",
      name: "test"
    }];
  }

  getProductList() {
    this.productListLOV = [{
      value: "test",
      name: "test"
    }];
  }

  issueQuote(carDetails: QuoteCar, groupPolicy: GroupPolicy) {
    console.log(carDetails, groupPolicy);
  }

}
