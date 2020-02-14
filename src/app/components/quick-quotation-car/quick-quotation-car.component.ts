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
import {
  QuickQuoteService
} from '../../services/quickqoute.service'
import {
  LovService
} from '../../services/lov.service'
import {
  CarLOVServices
} from '../../services/lov/car.service'
import { CarListObject } from 'src/app/objects/LOV/carList';

@Component({
  selector: 'app-quick-quotation-car',
  templateUrl: './quick-quotation-car.component.html',
  styleUrls: ['./quick-quotation-car.component.css']
})
export class QuickQuotationCarComponent implements OnInit, AfterViewChecked {
  @Input() carDetails = new QQCar();
  quickQuoteForm: FormGroup;

  LOV = new CarListObject();
  vehicleValue: any;

  showQuickQouteDetails: boolean = false;

  constructor(
    private fb: FormBuilder,
    private qq: QuickQuoteService,
    private lov: LovService,
    private carlov: CarLOVServices,
    private changeDetector: ChangeDetectorRef
  ) {
    this.createQuickQuoteForm();
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  ngOnInit() {
    var _this = this;
    this.carlov.getMakeList().then(res => {
      _this.LOV.makeLOV = res;
    });
  }

  createQuickQuoteForm() {
    this.quickQuoteForm = this.fb.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      vehicleType: ['', Validators.required],
      modelYear: ['', Validators.required],
      subModel: ['', Validators.required],
      typeOfUse: ['', Validators.required],
      subline: ['', Validators.required],
      value: ['', Validators.required],
    });
  }

  makeOnchange() {
    this.LOV.modelLOV = [];
    this.LOV.vehicleTypeLOV = [];
    this.LOV.modelYearLOV = [];
    this.LOV.subModelLOV = [];
    this.LOV.typeOfUseLOV = [];
    this.LOV.sublineLOV = [];

    const _carDetails = this.carDetails;
    this.carDetails = new QQCar();
    this.carDetails.make = _carDetails.make;
    
    var _this = this;
    this.carlov.getModelList(this.carDetails).then(res => {
      _this.LOV.modelLOV = res;
    });
  }

  modelOnchange() {
    this.LOV.vehicleTypeLOV = [];
    this.LOV.modelYearLOV = [];
    this.LOV.subModelLOV = [];
    this.LOV.typeOfUseLOV = [];
    this.LOV.sublineLOV = [];

    const _carDetails = this.carDetails;
    this.carDetails = new QQCar();
    this.carDetails.make = _carDetails.make;
    this.carDetails.model = _carDetails.model;

    var _this = this;
    this.carlov.getVehicleTypeList(this.carDetails).then(res => {
      _this.LOV.vehicleTypeLOV = res;
    });
  }

  vehicleTypeOnchange() {
    this.LOV.modelYearLOV = [];
    this.LOV.subModelLOV = [];
    this.LOV.typeOfUseLOV = [];
    this.LOV.sublineLOV = [];

    const _carDetails = this.carDetails;
    this.carDetails = new QQCar();
    this.carDetails.make = _carDetails.make;
    this.carDetails.model = _carDetails.model;
    this.carDetails.vehicleType = _carDetails.vehicleType;

    var _this = this;
    this.carlov.getModelYearList(this.carDetails).then(res => {
      _this.LOV.modelYearLOV = res;
    });
  }

  modelYearOnchange() {
    this.LOV.subModelLOV = [];
    this.LOV.typeOfUseLOV = [];
    this.LOV.sublineLOV = [];

    const _carDetails = this.carDetails;
    this.carDetails = new QQCar();
    this.carDetails.make = _carDetails.make;
    this.carDetails.model = _carDetails.model;
    this.carDetails.vehicleType = _carDetails.vehicleType;
    this.carDetails.modelYear = _carDetails.modelYear;

    var _this = this;
    this.carlov.getSubModelList(this.carDetails).then(res => {
      _this.LOV.subModelLOV = res;
    });
    this.carlov.getTypeOfUseList(this.carDetails).then(res => {
      _this.LOV.typeOfUseLOV = res;
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
      _this.LOV.sublineLOV = res.obj["list"];
    });
  }

  quickQuote(carDetails: QQCar) {
    this.showQuickQouteDetails = true;
  }

}
