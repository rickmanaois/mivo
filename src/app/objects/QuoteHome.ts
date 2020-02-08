import { GroupPolicy } from './GroupPolicy';

export class QuoteHome {
  quotationNumber: string;
  //risk details
  businessLine: string;
  currency: string;
  buildingNumber: string;
  subdivision: string;
  buildingName: string;
  streetName: string;
  barangay: string;
  region: string;
  province: string;
  municipality: string;

  //building / content details
  buildingCapital: number;
  contentValue: number;
  constructionOfBuilding: string;
  occupancyOfBuilding: string;
  front: string;
  right: string;
  left: string;
  rear: string;

  //improvement

  //other related structure details

  //other related content details

  //policy holder information
  clientName: string;

  //group policy
  groupPolicy: GroupPolicy;

  //general information
  effectivityDate: Date;
  expiryDate: Date;
  paymentMethod: string;
  productList: string;

  constructor() {}
}
