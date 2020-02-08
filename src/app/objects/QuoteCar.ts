import { GroupPolicy } from './GroupPolicy';

export class QuoteCar {
  quotationNumber: string;
  //vehicle information
  make: string;
  model: string;
  vehicleType: string;
  modelYear: string;
  subModel: string;
  typeOfUse: string;
  vehicleValue: string;
  subline: string;
  color: string;
  areaOfUsage: string;
  conductionNumber: string;
  plateNumber: string;
  serialNumber: string;
  engineNumber: string;
  mvFileNumber: string;
  purchaseDate: Date;
  receivedBy: string;
  receivedDate: Date;

  //accessories

  //policy holder information
  policyHolder: string;

  //group policy
  groupPolicy : GroupPolicy;
  
  //general information
  effectivityDate: Date;
  expiryDate: Date;
  paymentMethod: string;
  productList: string;
  
  //additional policy information

  //subagent

  constructor() {}
}
