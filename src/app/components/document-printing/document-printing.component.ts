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
  soaProcessDateLOV: any[];

  showPolicyDetails: boolean = false;
  showQuotationDetails: boolean = false;
  showCommissionStatementDetails: boolean = false;
  //flag if there is no generated commission statement dates for the agent
  showCsDate: boolean = false;

  showSOADetails: boolean = false;

  //modal reference
  modalRef: BsModalRef;

  dateNameFormat: string = 'MMM DD, YYYY';
  dateValueFormat: string = 'DDMMYYYY';

  constructor(
    private fb: FormBuilder,
    private us: UtilityService,
    private bms: BsModalService) {
    this.createForm();
    this.setValidations();
  }

  ngOnInit(): void {
    this.getSOADates();
    this.us.getDateRecord().then((res) => {
      // date records for commission statement dates
      if (res.status) {
        this.csProcessDateLOV = res.obj as[];
        if (this.csProcessDateLOV.length) {
          this.formatDate(this.csProcessDateLOV);
          this.showCsDate = true;
        }
      } else {
        this.modalRef = Utility.showError(this.bms, res.message);
      }
    });
  }

  formatDate(lov: any[]) {
    lov.forEach(el => {
      var date = new Date(el.fec_PROCESO);
      el.date = moment(date).format(this.dateNameFormat);
      el.value = moment(date).format(this.dateValueFormat);
    });
  }

  getSOADates() {
    const number = 3;
    let today = new Date();
    var arr = [];

    for (var i = 1; i <= number; i++) {
      var name = moment(today).subtract(1, 'months').endOf('month').format(this.dateNameFormat);
      var value = moment(today).subtract(1, 'months').endOf('month').format(this.dateValueFormat);
      today = new Date(name);
      arr.push({
        name,
        value
      });
    }
    this.soaProcessDateLOV = arr;
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
      csPass: ['', Validators.required],
      soaProcessDate: ['', Validators.required],
      soaPass: ['', Validators.required]
    });
  }

  setValidations() {
    var policyNumber = this.documentPrintingForm.get('policyNumber');
    var quotationNumber = this.documentPrintingForm.get('quotationNumber');
    var csProcessDate = this.documentPrintingForm.get('csProcessDate');
    var csPass = this.documentPrintingForm.get('csPass');
    var soaProcessDate = this.documentPrintingForm.get('soaProcessDate');
    var soaPass = this.documentPrintingForm.get('soaPass');

    this.documentPrintingForm.get('documentType').valueChanges.subscribe(documentType => {
      this.showPolicyDetails = false;
      this.showQuotationDetails = false;
      this.showCommissionStatementDetails = false;
      this.showSOADetails = false;

      //removing required validation
      Utility.updateValidator(policyNumber, null);
      Utility.updateValidator(quotationNumber, null);
      Utility.updateValidator(csProcessDate, null);
      Utility.updateValidator(csPass, null);
      Utility.updateValidator(soaProcessDate, null);
      Utility.updateValidator(soaPass, null);

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
      } else if (documentType == "S") { //commission statement
        this.showSOADetails = true;
        Utility.updateValidator(soaProcessDate, [Validators.required]);
        Utility.updateValidator(soaPass, [Validators.required]);
      }
    });
  }

  policyNumberOnChange() {
    this.us.getEndorsementNumber(this.documentPrintingDetails).then((res) => {
      if (res.status) {
        this.documentPrintingDetails.endorsementNumber = res.obj as String;
      }
    });
  }

  print(documentPrintingDetails: DocumentPrinting) {
    this.us.validatePrinting(documentPrintingDetails).then((res) => {
      if (res.status) {
        var ext = res.obj;
        this.us.printDocument(ext.toString()).subscribe(data => {
          if (data != null) {
            window.open(URL.createObjectURL(data));
          }
        });
      } else {
        this.modalRef = Utility.showError(this.bms, res.message);
      }
    });
  }
}
