export class ThirdParty {
  documentType: string;
  documentCode: string;
  policyHolderType: string;
  prefix: number;
  suffix: number;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: number;
  birthDate: Date;
  mobileNumber: string;
  correspondenceType: number;
  country: string;
  state: number;
  municipility: number;
  city: number;
  address: string;
  zipcode: number;
  email: string;
  orgDocumentType: string;
  orgDocumentCode: string;
  orgNationality: number;
  orgFirstName: string;
  orgLastName: string;
  orgPost: number;
  orgTypeOfBusiness: number;
  personMaritalStatus: string;
  personProfession: number;
  personOccupation: number;
  personNationality: number;
  personType: number;
  personLanguage: string;

  constructor(init ? : Partial < ThirdParty > ) {
    Object.assign(this, init);
  }
}