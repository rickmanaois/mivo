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

@Component({
  selector: 'app-document-printing',
  templateUrl: './document-printing.component.html',
  styleUrls: ['./document-printing.component.css']
})
export class DocumentPrintingComponent implements OnInit {
  documentPrintingDetails = new DocumentPrinting();
  documentPrintingForm: FormGroup;
  commissionStatementDateLOV: any[];

  showPolicyDetails: boolean = false;
  showQuotationDetails: boolean = false;
  showCommissionStatementDetails: boolean = false;

  //modal reference
  modalRef: BsModalRef;

  constructor(
    private fb: FormBuilder,
    private util: UtilityService,
    private modalService: BsModalService) {
    this.createForm();
    this.setValidations();
  }

  ngOnInit(): void {}

  createForm() {
    this.documentPrintingForm = this.fb.group({
      documentType: ['', Validators.required],
      policyNumber: ['', Validators.required],
      endorsementNumber: [null],
      policyPPRF: [null],
      policyPAC: [null],
      policyPV: [null],
      quotationNumber: ['', Validators.required],
      commissionStatementDate: ['', Validators.required]
    });
  }

  setValidations() {
    var policyNumber = this.documentPrintingForm.get('policyNumber');
    var quotationNumber = this.documentPrintingForm.get('quotationNumber');
    var commissionStatementDate = this.documentPrintingForm.get('commissionStatementDate');

    this.documentPrintingForm.get('documentType').valueChanges.subscribe(documentType => {
      this.showPolicyDetails = false;
      this.showQuotationDetails = false;
      this.showCommissionStatementDetails = false;

      //removing required validation
      Utility.updateValidator(policyNumber, null);
      Utility.updateValidator(quotationNumber, null);
      Utility.updateValidator(commissionStatementDate, null);

      if (documentType == "P") { //standard personal accident
        this.showPolicyDetails = true;
        Utility.updateValidator(policyNumber, [Validators.required]);
      } else if (documentType == "Q") { //hospital cash benefit
        this.showQuotationDetails = true;
        Utility.updateValidator(quotationNumber, [Validators.required]);
      } else if (documentType == "C") {
        this.showCommissionStatementDetails = true;
        Utility.updateValidator(commissionStatementDate, [Validators.required]);
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
