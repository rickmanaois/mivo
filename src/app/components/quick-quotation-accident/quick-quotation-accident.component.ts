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
  QQAccident
} from '../../objects/QQAccident';
import {
  Utility
} from '../../utils/utility';

@Component({
  selector: 'app-quick-quotation-accident',
  templateUrl: './quick-quotation-accident.component.html',
  styleUrls: ['./quick-quotation-accident.component.css']
})
export class QuickQuotationAccidentComponent implements OnInit, AfterViewChecked {
  @Input() accidentDetails = new QQAccident();
  option: string = '';
  quickQuoteForm: FormGroup;

  showDetails: boolean = false;
  showSPADetails: boolean = false;
  showHCBIDetails: boolean = false;

  sublineLOV: any[];
  occupationalClassLOV: any[];
  disablementValueLOV: any[];
  primaryInsuredAgeLOV: any[];
  spouseAgeLOV: any[];
  childAgeLOV: any[];

  constructor(
    private fb: FormBuilder,
    // private qq: QuickQuoteService,
    // private lov: LovService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.createQuickQuoteForm();
    this.setValidations();
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  ngOnInit() {
    this.getSubline();
    this.getOccupationalClass();
    this.getDisablementValue();
    this.getPrimaryAge();
    this.getSpouseAge();
    this.getChildAge();
  }

  createQuickQuoteForm() {
    this.quickQuoteForm = this.fb.group({
      subline: ['', Validators.required],
      occupationalClass: ['', Validators.required],
      disablementValue: ['', Validators.required],
      primaryInsuredAge: ['', Validators.required],
      cbSpouseAge: [null],
      spouseAge: ['', Validators.required],
      cbChildAge: [null],
      childAge: ['', Validators.required]
    });
  }

  setValidations() {
    var occupationalClass = this.quickQuoteForm.get('occupationalClass');
    var disablementValue = this.quickQuoteForm.get('disablementValue');
    var primaryInsuredAge = this.quickQuoteForm.get('primaryInsuredAge');
    var spouseAge = this.quickQuoteForm.get('spouseAge');
    var cbSpouseAge = this.quickQuoteForm.get('cbSpouseAge');
    var childAge = this.quickQuoteForm.get('childAge');
    var cbChildAge = this.quickQuoteForm.get('cbChildAge');

    this.quickQuoteForm.get('subline').valueChanges.subscribe(subline => {
      this.showDetails = false;
      this.showSPADetails = false;
      this.showHCBIDetails = false;

      //removing required validation
      Utility.updateValidator(occupationalClass, null);
      Utility.updateValidator(disablementValue, null);
      Utility.updateValidator(primaryInsuredAge, null);
      Utility.updateValidator(spouseAge, null);
      Utility.updateValidator(childAge, null);

      if (subline == 323) { //standard personal accident
        this.showDetails = true;
        this.showSPADetails = true;
        Utility.updateValidator(occupationalClass, [Validators.required]);
        Utility.updateValidator(disablementValue, [Validators.required]);
      } else if (subline == 326) { //hospital cassh benefit
        this.showDetails = true;
        this.showHCBIDetails = true;
        Utility.updateValidator(primaryInsuredAge, [Validators.required]);
        Utility.updateValidator(spouseAge, cbSpouseAge.value === true ? [Validators.required] : null);
        Utility.updateValidator(childAge, cbChildAge.value === true ? [Validators.required] : null);
      }
    });

    cbSpouseAge.valueChanges.subscribe(checked => {
      this.accidentDetails.spouseAge = Utility.setNull(checked, this.accidentDetails.spouseAge);
      Utility.updateValidator(spouseAge, checked === true ? [Validators.required] : null);
    });

    cbChildAge.valueChanges.subscribe(checked => {
      this.accidentDetails.childAge = Utility.setNull(checked, this.accidentDetails.childAge);
      Utility.updateValidator(childAge, checked === true ? [Validators.required] : null);
    });
  }

  getSubline() {
    this.sublineLOV = [{
        value: "323",
        name: "Standard Personal Accident"
      },
      {
        value: "325",
        name: "Family Provider's Accident Insurance"
      },
      {
        value: "326",
        name: "Hospital Cash Benefit Insurance"
      }
    ];
  }

  getOccupationalClass() {
    this.occupationalClassLOV = [{
      value: "1",
      name: "test"
    }];
  }

  getDisablementValue() {
    this.disablementValueLOV = [{
      value: "1",
      name: "test"
    }];
  }

  getPrimaryAge() {
    this.primaryInsuredAgeLOV = [{
      value: "1",
      name: "test"
    }];
  }

  getSpouseAge() {
    this.spouseAgeLOV = [{
      value: "1",
      name: "test"
    }];
  }

  getChildAge() {
    this.childAgeLOV = [{
      value: "1",
      name: "test"
    }];
  }

  quickQuote(accidentDetails: QQAccident) {
    console.log(accidentDetails);
  }

}
