export class User {
  userId: number;
  role: number;
  agentCode: number;
  username: string;
  // password: string;
  firstName: string;
  lastName: string;
  fullName: string;
  token: string;

  constructor(init ? : Partial < User > ) {
    Object.assign(this, init);
  }
}
