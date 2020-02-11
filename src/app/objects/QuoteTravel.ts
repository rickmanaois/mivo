import { Traveller } from './Traveller';

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

  //policy holder information
  clientName: string;

  //travellers
  travellers: [Traveller];

  //additional policy information

  //coverages
  travelInsurance: string;
  optionPack: string;
  medicalExpenses: string;

  constructor(init?: Partial<QuoteTravel>) {
    Object.assign(this, init);
  }
}
