export class PolicyHolder {
  organization: boolean = true;
	name: String;
  
  constructor(init?: Partial<PolicyHolder>) {
    Object.assign(this, init);
  }
}
