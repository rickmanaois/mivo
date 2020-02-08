import { GroupPolicy } from './GroupPolicy';

export class QuoteTravel {
  quotationNumber: string;
  
  //risk details
  subline: string;

  //group policy
  groupPolicy: GroupPolicy;

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
