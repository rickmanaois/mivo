export class Beneficiary {
  documentType: number;
	documentCode: String;
	benificiaryType: number;
  
  constructor(init?: Partial<Beneficiary>) {
    Object.assign(this, init);
  }
}
