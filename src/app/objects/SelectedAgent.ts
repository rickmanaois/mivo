export class SelectedAgent {
  agentCode: number;
  agentName: string;
  documentCode: string;
  documentType: string;
  documentName: string;
  agentType: number;
  agentTypeName: string;
  agentAddress: string;

  token: string;
  constructor(init ? : Partial < SelectedAgent > ) {
    Object.assign(this, init);
  }
}
