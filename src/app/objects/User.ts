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

  token: string;
  constructor(init ? : Partial < User > ) {
    Object.assign(this, init);
  }
}
