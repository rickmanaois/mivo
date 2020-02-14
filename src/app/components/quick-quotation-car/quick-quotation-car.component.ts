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
      vehicleValue: ['', Validators.required],
    });
  }

  clearRiskDetails(level: number, type ? : boolean) {
    if (level <= 1) {//if user changes car make
      this.LOV.modelLOV = [];
      this.carDetails.model = undefined;
      this.quickQuoteForm.get('model').reset();
    }
    if (level <= 2) {//if user changes car model
      this.LOV.vehicleTypeLOV = [];
      this.carDetails.vehicleType = undefined;
      this.quickQuoteForm.get('vehicleType').reset();
    }
    if (level <= 3) {//if user changes vehicle type
      this.LOV.modelYearLOV = [];
      this.carDetails.modelYear = undefined;
      this.quickQuoteForm.get('modelYear').reset();
    }
    if (level <= 4) {//if user changes car model year
      this.LOV.subModelLOV = [];
      this.LOV.typeOfUseLOV = [];
      this.carDetails.subModel = undefined;
      this.carDetails.typeOfUse = undefined;
      this.quickQuoteForm.get('subModel').reset();
      this.quickQuoteForm.get('typeOfUse').reset();
    }
    if (level <= 5) {//if user changes car sub model or type of use
      if (level == 5) {
        if (type) {
          //if user changes type of use
          this.LOV.sublineLOV = [];
          this.carDetails.subline = undefined;
          this.quickQuoteForm.get('subline').reset();
        } else {
          //if user changes sub model
          this.carDetails.vehicleValue = undefined;
          this.quickQuoteForm.get('vehicleValue').reset();
        }
      } else {
        //if level is below 5, subline and vehicle value will reset
        this.LOV.sublineLOV = [];
        this.carDetails.subline = undefined;
        this.carDetails.vehicleValue = undefined;
        this.quickQuoteForm.get('subline').reset();
        this.quickQuoteForm.get('vehicleValue').reset();
      }
    }
  }

  makeOnchange() {
    this.clearRiskDetails(1);
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
    this.carDetails.subModel = _carDetails.subModel
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
