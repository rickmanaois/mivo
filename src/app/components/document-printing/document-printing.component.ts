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
    this.util.getDateRecord().then((res) => {
      // date records for commission statement dates
      if (res.status) {
        this.csProcessDateLOV = res.obj as [];
        if (this.csProcessDateLOV.length) {
          this.formatDate(this.csProcessDateLOV);
          this.showCsDate = true;
        }
      } else {
        this.modalRef = Utility.showError(this.modalService, res.message);
      }
    });
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

      if (documentType == "P") { //policy
        this.showPolicyDetails = true;
        Utility.updateValidator(policyNumber, [Validators.required]);
      } else if (documentType == "Q") { //quotation
        this.showQuotationDetails = true;
        Utility.updateValidator(quotationNumber, [Validators.required]);
      } else if (documentType == "C") { //commission statement
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
