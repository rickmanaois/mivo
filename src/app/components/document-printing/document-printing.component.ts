import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import {
  DocumentPrinting
} from '../../objects/DocumentPrinting';
import {
  UtilityService
} from '../../services/utility.service';
import {
  Utility
} from '../../utils/utility';
import {
  BsModalRef,
  BsModalService
} from 'ngx-bootstrap/modal';
import * as moment from 'moment';

@Component({
  selector: 'app-document-printing',
  templateUrl: './document-printing.component.html',
  styleUrls: ['./document-printing.component.css']
})
export class DocumentPrintingComponent implements OnInit {
  documentPrintingDetails = new DocumentPrinting();
  documentPrintingForm: FormGroup;
  csProcessDateLOV: any[];
  
  // csProssesDateLOV = [{
  //   "fec_PROCESO": "2020-04-26T16:00:00.000+0000"
  // }, {
  //   "fec_PROCESO": "2020-04-19T16:00:00.000+0000"
  // }, {
  //   "fec_PROCESO": "2020-04-12T16:00:00.000+0000"
  // }, {
  //   "fec_PROCESO": "2020-04-05T16:00:00.000+0000"
  // }, {
  //   "fec_PROCESO": "2020-03-29T16:00:00.000+0000"
  // }, {
  //   "fec_PROCESO": "2020-03-22T16:00:00.000+0000"
  // }, {
  //   "fec_PROCESO": "2020-03-15T16:00:00.000+0000"
  // }, {
  //   "fec_PROCESO": "2020-03-08T16:00:00.000+0000"
  // }, {
  //   "fec_PROCESO": "2020-03-01T16:00:00.000+0000"
  // }, {
  //   "fec_PROCESO": "2020-02-23T16:00:00.000+0000"
  // }, {
  //   "fec_PROCESO": "2020-02-16T16:00:00.000+0000"
  // }, {
  //   "fec_PROCESO": "2020-02-09T16:00:00.000+0000"
  // }];

  showPolicyDetails: boolean = false;

  showQuotationDetails: boolean = false;

  showCommissionStatementDetails: boolean = false;
  //flag if there is no generated dates for the agent
  showCsDate: boolean = false;

  //modal reference
  modalRef: BsModalRef;

  constructor(
    private fb: FormBuilder,
    private util: UtilityService,
    private modalService: BsModalService) {
    this.createForm();
    this.setValidations();
  }

  ngOnInit(): void {
    this.showCsDate = true;
    this.util.getDateRecord().then((res) => {
      if (res.status) {
        const arr: any[] = JSON.parse(res.obj.toString());
        this.csProcessDateLOV = arr;
        this.formatDate(this.csProcessDateLOV)
      } else {
        this.modalRef = Utility.showError(this.modalService, res.message);
      }
    });
    this.formatDate(this.csProcessDateLOV);
  }

  formatDate(lov: any[]) {
    lov.forEach(el => {
      var date = new Date(el.fec_PROCESO)
      el.date = moment(date).format('MMM DD YYYY');
      el.value = moment(date).format('DDMMYYYY');
    });
  }

  createForm() {
    this.documentPrintingForm = this.fb.group({
      documentType: ['', Validators.required],
      policyNumber: ['', Validators.required],
      endorsementNumber: [null],
      policyPPRF: [null],
      policyPAC: [null],
      policyPV: [null],
      quotationNumber: ['', Validators.required],
      csProcessDate: ['', Validators.required],
      csPass: ['', Validators.required]
    });
  }

  setValidations() {
    var policyNumber = this.documentPrintingForm.get('policyNumber');
    var quotationNumber = this.documentPrintingForm.get('quotationNumber');
    var csProcessDate = this.documentPrintingForm.get('csProcessDate');
    var csPass = this.documentPrintingForm.get('csPass');

    this.documentPrintingForm.get('documentType').valueChanges.subscribe(documentType => {
      this.showPolicyDetails = false;
      this.showQuotationDetails = false;
      this.showCommissionStatementDetails = false;

      //removing required validation
      Utility.updateValidator(policyNumber, null);
      Utility.updateValidator(quotationNumber, null);
      Utility.updateValidator(csProcessDate, null);
      Utility.updateValidator(csPass, null);

      if (documentType == "P") { //standard personal accident
        this.showPolicyDetails = true;
        Utility.updateValidator(policyNumber, [Validators.required]);
      } else if (documentType == "Q") { //hospital cash benefit
        this.showQuotationDetails = true;
        Utility.updateValidator(quotationNumber, [Validators.required]);
      } else if (documentType == "C") {
        this.showCommissionStatementDetails = true;
        Utility.updateValidator(csProcessDate, [Validators.required]);
        Utility.updateValidator(csPass, [Validators.required]);
      }
    });
  }

  print(documentPrintingDetails: DocumentPrinting) {
    this.util.validatePrinting(documentPrintingDetails).then((res) => {
      if (res.status) {
        var ext = res.obj;
        this.util.printDocument(ext.toString()).subscribe(data => {
          if (data != null) {
            window.open(URL.createObjectURL(data));
          }
        });
      } else {
        this.modalRef = Utility.showError(this.modalService, res.message);
      }
    });
  }
}
