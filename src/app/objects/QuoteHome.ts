export class QuoteHome {
  //risk details
  quotationNumber: string;
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

  //policy holder information
  clientName: string;

  effectivityDate: Date;
  expiryDate: Date;
  paymentMethod: string;
  productList: string;
  
  //new object
  //policyInformation

  //new object
  //subAgent

  constructor() {}
}
