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
      subline: ['', Validators.required],
      cbBuilding: [null],
      building: [null],
      cbContent: [null],
      content: [null],
      cbImprovements: [null],
      improvements: [null],
      cbRelatedBuild: [null],
      relatedBuild: [null],
      cbRelatedContent: [null],
      relatedContent: [null],
    });
  }

  setValidations() {
    const cbBuilding = this.quickQuoteForm.get('cbBuilding');
    const cbContent = this.quickQuoteForm.get('cbContent');
    const cbImprovements = this.quickQuoteForm.get('cbImprovements');
    const cbRelatedBuild = this.quickQuoteForm.get('cbRelatedBuild');
    const cbRelatedContent = this.quickQuoteForm.get('cbRelatedContent');

    const improvements = this.quickQuoteForm.get('improvements');
    const relatedBuild = this.quickQuoteForm.get('relatedBuild');
    const relatedContent = this.quickQuoteForm.get('relatedContent');

    cbBuilding.valueChanges.subscribe(checked => {
      const building = this.quickQuoteForm.get('building');
      this.homeDetails.building = Utility.setNull(checked, this.homeDetails.building);
      Utility.updateValidator(building, checked ? [Validators.required] : null);

      if (!checked && cbContent.value !== true) {
        this.homeDetails.improvements = null;
        this.homeDetails.relatedBuild = null;
        this.homeDetails.relatedContent = null;
        Utility.updateValidator(improvements, null);
        Utility.updateValidator(relatedBuild, null);
        Utility.updateValidator(relatedContent, null);
      } else if (cbContent.value === true) {
        Utility.updateValidator(improvements, cbImprovements.value === true ? [Validators.required] : null);
        Utility.updateValidator(relatedBuild, cbRelatedBuild.value === true ? [Validators.required] : null);
        Utility.updateValidator(relatedContent, cbRelatedContent.value === true ? [Validators.required] : null);
      }
    });

    cbContent.valueChanges.subscribe(checked => {
      const content = this.quickQuoteForm.get('content');
      this.homeDetails.content = Utility.setNull(checked, this.homeDetails.content);
      Utility.updateValidator(content, checked ? [Validators.required] : null);

      if (!checked && cbBuilding.value !== true) {
        this.homeDetails.improvements = null;
        this.homeDetails.relatedBuild = null;
        this.homeDetails.relatedContent = null;
        Utility.updateValidator(improvements, null);
        Utility.updateValidator(relatedBuild, null);
        Utility.updateValidator(relatedContent, null);
      } else if (cbBuilding.value === true) {
        Utility.updateValidator(improvements, cbImprovements.value === true ? [Validators.required] : null);
        Utility.updateValidator(relatedBuild, cbRelatedBuild.value === true ? [Validators.required] : null);
        Utility.updateValidator(relatedContent, cbRelatedContent.value === true ? [Validators.required] : null);
      }
    });

    cbImprovements.valueChanges.subscribe(checked => {
      this.homeDetails.improvements = Utility.setNull(checked, this.homeDetails.improvements);
      Utility.updateValidator(improvements, checked ? [Validators.required] : null);
    });

    cbRelatedBuild.valueChanges.subscribe(checked => {
      this.homeDetails.relatedBuild = Utility.setNull(checked, this.homeDetails.relatedBuild);
      Utility.updateValidator(relatedBuild, checked ? [Validators.required] : null);
    });

    cbRelatedContent.valueChanges.subscribe(checked => {
      this.homeDetails.relatedContent = Utility.setNull(checked, this.homeDetails.relatedContent);
      Utility.updateValidator(relatedContent, checked ? [Validators.required] : null);
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
