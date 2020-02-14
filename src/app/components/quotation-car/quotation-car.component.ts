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
import { GroupPolicyListObject } from 'src/app/objects/LOV/groupPolicyList';

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

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  makeOnchange() {
    alert('make');
    this.LOV.modelLOV = [];
    this.LOV.vehicleTypeLOV = [];
    this.LOV.modelYearLOV = [];
    this.LOV.subModelLOV = [];
    this.LOV.typeOfUseLOV = [];
    this.LOV.sublineLOV = [];

    const _carDetails = this.carDetails;
    this.carDetails = new QuoteCar();
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
    this.carDetails = new QuoteCar();
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
    this.carDetails = new QuoteCar();
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
    this.carDetails = new QuoteCar();
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
      _this.LOV.sublineLOV = res.obj["list"];
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
