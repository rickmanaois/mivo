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

  //accident death and disablement value
  disablementValue: number;

  productList: string;

  constructor() {}
}
