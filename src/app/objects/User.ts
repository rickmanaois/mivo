export class User {
  userId: number;
  role: number;
  agentCode: number;
  username: string;
  firstName: string;
  lastName: string;
  fullName: string;
  address: string;
  expiryDay: number;
  selectedAgent: {
    agentCode: number;
    agentName: string;
    documentCode: string;
    documentType: string;
    documentName: string;
    agentType: number;
    agentTypeName: string;
    agentAddress: string;
  };

  token: string;
  constructor(init ? : Partial < User > ) {
    Object.assign(this, init);
  }
}
