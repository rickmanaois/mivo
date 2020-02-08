import { GroupPolicy } from './GroupPolicy';

export class QuoteTravel {
  quotationNumber: string;
  //travel itinerary
  currency: string;
  country: [Object];
  travelPackage: string;
  travelType: string;
  startDate: Date;
  endDate: Date;
  noOfDays: number;
  completeItinerary: string;
  purposeOfTrip: string;
  oneTripOnly: string;

  //group policy
  groupPolicy : GroupPolicy;

  //policy holder information
  clientName: string;

  //travellers

  //additional policy information

  //coverages
  travelInsurance: string;
  optionPack: string;
  medicalExpenses: string;

  constructor() {}
}
