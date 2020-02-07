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
  QQHome
} from '../../objects/QQHome';
import {
  Utility
} from '../../utils/utility';

@Component({
  selector: 'app-quick-quotation-home',
  templateUrl: './quick-quotation-home.component.html',
  styleUrls: ['./quick-quotation-home.component.css']
})
export class QuickQuotationHomeComponent implements OnInit, AfterViewChecked {
  @Input() homeDetails = new QQHome();
  option: string = '';
  quickQuoteForm: FormGroup;

  sublineLOV: any[];

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
  }

  createQuickQuoteForm() {
    this.quickQuoteForm = this.fb.group({
      quickSubline: ['', Validators.required],
      quickCbBuilding: [null],
      quickBuilding: [null],
      quickCbContent: [null],
      quickContent: [null],
      quickCbImprovements: [null],
      quickImprovements: [null],
      quickCbRelatedBuild: [null],
      quickRelatedBuild: [null],
      quickCbRelatedContent: [null],
      quickRelatedContent: [null],
    });
  }

  setValidations() {
    const quickCbBuilding = this.quickQuoteForm.get('quickCbBuilding');
    const quickCbContent = this.quickQuoteForm.get('quickCbContent');
    const quickCbImprovements = this.quickQuoteForm.get('quickCbImprovements');
    const quickCbRelatedBuild = this.quickQuoteForm.get('quickCbRelatedBuild');
    const quickCbRelatedContent = this.quickQuoteForm.get('quickCbRelatedContent');

    const quickImprovements = this.quickQuoteForm.get('quickImprovements');
    const quickRelatedBuild = this.quickQuoteForm.get('quickRelatedBuild');
    const quickRelatedContent = this.quickQuoteForm.get('quickRelatedContent');

    quickCbBuilding.valueChanges.subscribe(checked => {
      const quickBuilding = this.quickQuoteForm.get('quickBuilding');
      Utility.updateValidator(quickBuilding, checked ? [Validators.required] : null);

      if (!checked && quickCbContent.value !== true) {
        Utility.updateValidator(quickImprovements, null);
        Utility.updateValidator(quickRelatedBuild, null);
        Utility.updateValidator(quickRelatedContent, null);
      } else if (quickCbContent.value === true) {
        Utility.updateValidator(quickImprovements, quickCbImprovements.value === true ? [Validators.required] : null);
        Utility.updateValidator(quickRelatedBuild, quickCbRelatedBuild.value === true ? [Validators.required] : null);
        Utility.updateValidator(quickRelatedContent, quickCbRelatedContent.value === true ? [Validators.required] : null);
      }
    });

    quickCbContent.valueChanges.subscribe(checked => {
      const quickContent = this.quickQuoteForm.get('quickContent');
      Utility.updateValidator(quickContent, checked ? [Validators.required] : null);

      if (!checked && quickCbBuilding.value !== true) {
        Utility.updateValidator(quickImprovements, null);
        Utility.updateValidator(quickRelatedBuild, null);
        Utility.updateValidator(quickRelatedContent, null);
      } else if (quickCbBuilding.value === true) {
        Utility.updateValidator(quickImprovements, quickCbImprovements.value === true ? [Validators.required] : null);
        Utility.updateValidator(quickRelatedBuild, quickCbRelatedBuild.value === true ? [Validators.required] : null);
        Utility.updateValidator(quickRelatedContent, quickCbRelatedContent.value === true ? [Validators.required] : null);
      }
    });

    quickCbImprovements.valueChanges.subscribe(checked => {
      Utility.updateValidator(quickImprovements, checked ? [Validators.required] : null);
    });

    quickCbRelatedBuild.valueChanges.subscribe(checked => {
      Utility.updateValidator(quickRelatedBuild, checked ? [Validators.required] : null);
    });

    quickCbRelatedContent.valueChanges.subscribe(checked => {
      Utility.updateValidator(quickRelatedContent, checked ? [Validators.required] : null);
    });
  }

  getSubline() {
    this.sublineLOV = [{
      value: "test",
      name: "test"
    }];
  }

  quickQuote(homeDetails: QQHome) {
    console.log(homeDetails);
  }

}
