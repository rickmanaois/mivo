export class DocumentPrinting {
  documentType: String;
	policyNumber: String;
	endorsementNumber: String;
  policyPPRF: boolean;
  policyPAC: boolean;
  policyPV: boolean;
  quotationNumber: String;
  commissionStatementDate: String;
  
  constructor(init?: Partial<DocumentPrinting>) {
    Object.assign(this, init);
  }
}
