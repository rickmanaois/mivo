export class QuoteAccident {
  quotationNumber: string;
  
  //risk details
  subline: string;

  //general information
  effectivityDate: Date;
  expiryDate: Date;

  //policy holder information
  lastName: string;
  firstName: string;

  //insured details
  middleName: string;
  suffix: string;
  gender: string;
  relationship: string;
  birthDate: Date;
  cbWithHealthDeclaration: boolean;
  preExistingIllness: string;
  occupationalClass: string;
  occupation: string;

  //accident death and disablement value
  disablementValue: number;

  productList: string;

  constructor() {}
}
