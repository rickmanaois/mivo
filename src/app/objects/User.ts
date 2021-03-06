﻿import { SelectedAgent } from './SelectedAgent';

export class User {
  userId: number;
  role: number;
  agentCode: number;
  userName: string;
  firstName: string;
  lastName: string;
  fullName: string;
  address: string;
  expiryDay: number;
  commStructure: number;
  selectedAgent: SelectedAgent;

  token: string;
  constructor(init ? : Partial < User > ) {
    Object.assign(this, init);
  }
}
