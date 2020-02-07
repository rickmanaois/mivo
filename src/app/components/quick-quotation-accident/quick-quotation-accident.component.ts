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
      quickSubline: ['', Validators.required],
      quickOccupationalClass: ['', Validators.required],
      quickDisablementValue: ['', Validators.required],
      quickPrimaryInsuredAge: ['', Validators.required],
      quickCbSpouseAge: [null],
      quickSpouseAge: ['', Validators.required],
      quickCbChildAge: [null],
      quickChildAge: ['', Validators.required]
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

  setValidations() {
    var quickOccupationalClass = this.quickQuoteForm.get('quickOccupationalClass');
    var quickDisablementValue = this.quickQuoteForm.get('quickDisablementValue');
    var quickPrimaryInsuredAge = this.quickQuoteForm.get('quickPrimaryInsuredAge');
    var quickSpouseAge = this.quickQuoteForm.get('quickSpouseAge');
    var quickCbSpouseAge = this.quickQuoteForm.get('quickCbSpouseAge');
    var quickChildAge = this.quickQuoteForm.get('quickChildAge');
    var quickCbChildAge = this.quickQuoteForm.get('quickCbChildAge');

    //removing required validation
    Utility.updateValidator(quickOccupationalClass, null);
    Utility.updateValidator(quickDisablementValue, null);
    Utility.updateValidator(quickPrimaryInsuredAge, null);
    Utility.updateValidator(quickSpouseAge, null);
    Utility.updateValidator(quickChildAge, null);

    this.quickQuoteForm.get('quickSubline').valueChanges.subscribe(subline => {
      this.showDetails = false;
      this.showSPADetails = false;
      this.showHCBIDetails = false;
      if (subline == 323) { //standard personal accident
        this.showDetails = true;
        this.showSPADetails = true;
        Utility.updateValidator(quickOccupationalClass, [Validators.required]);
        Utility.updateValidator(quickDisablementValue, [Validators.required]);
      } else if (subline == 326) { //hospital cassh benefit
        this.showDetails = true;
        this.showHCBIDetails = true;
        Utility.updateValidator(quickPrimaryInsuredAge, [Validators.required]);
        Utility.updateValidator(quickSpouseAge, quickCbSpouseAge.value === true ? [Validators.required] : null);
        Utility.updateValidator(quickChildAge, quickCbChildAge.value === true ? [Validators.required] : null);
      }
    });

    quickCbSpouseAge.valueChanges.subscribe(checked => {
      Utility.updateValidator(quickSpouseAge, checked === true ? [Validators.required] : null);
    });

    quickCbChildAge.valueChanges.subscribe(checked => {
      Utility.updateValidator(quickChildAge, checked === true ? [Validators.required] : null);
    });
  }

  quickQuote(accidentDetails: QQAccident) {
    console.log(accidentDetails);
  }

}
