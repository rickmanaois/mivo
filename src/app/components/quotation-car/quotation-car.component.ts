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
  QQCar
} from '../../objects/QQCar';
import  { QuickQuoteService } from '../../services/quickqoute.service'
import {
  LovService
} from '../../services/lov.service'
import {
  LOV
} from '../../objects/LOV';

@Component({
  selector: 'app-quotation-car',
  templateUrl: './quotation-car.component.html',
  styleUrls: ['./quotation-car.component.css']
})
export class QuotationCarComponent implements OnInit, AfterViewChecked {
  @Input() carDetails = new QQCar();
  quickQuoteForm: FormGroup;
  option: string = '';

  makeLOV: any[];
  modelLOV: any[];
  vehicleTypeLOV: any[];
  modelYearLOV: any[];
  subModelLOV: any[];
  typeOfUseLOV: any[];
  sublineLOV: any[];
  vehicleValue: any;
  
  showQuickQouteDetails: boolean = false;

  constructor(
    private fb: FormBuilder,
    private qq: QuickQuoteService,
    private lov: LovService,
    private changeDetector : ChangeDetectorRef
  ) {
    this.createQuickQuoteForm();
  }

  ngAfterViewChecked(){
    this.changeDetector.detectChanges();
  }

  ngOnInit() {
    this.getMakeList();
  }

  createQuickQuoteForm() {
    this.quickQuoteForm = this.fb.group({
      quickMake: ['', Validators.required],
      quickModel: ['', Validators.required],
      quickVehicleType: ['', Validators.required],
      quickModelYear: ['', Validators.required],
      quickSubModel: ['', Validators.required],
      quickTypeOfUse: ['', Validators.required],
      quickSubline: ['', Validators.required],
      quickValue: ['', Validators.required],
    });
  }

  getMakeList() {
    const dto = new LOV('A2100400', '3', 'COD_CIA~1');
    const _this = this;
    this.lov.getLOV(dto).then(lovs => {
      _this.makeLOV = lovs;
    });
  }

  makeOnchange() {
    this.modelLOV = [];
    this.vehicleTypeLOV = [];
    this.modelYearLOV = [];
    this.subModelLOV = [];
    this.typeOfUseLOV = [];
    this.sublineLOV = [];

    const _carDetails = this.carDetails;
    this.carDetails = new QQCar();
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
    this.carDetails = new QQCar();
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
    this.carDetails = new QQCar();
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
    this.carDetails = new QQCar();
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
    this.carDetails = new QQCar();
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
    this.carDetails = new QQCar();
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

  quickQuote(carDetails: QQCar) {
    this.showQuickQouteDetails = true;
    // this.qq.car(carDetails);
  }

  setOption(val: string) {
    this.option = val;
  }

}
