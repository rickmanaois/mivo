export class Coverage {
  coverageId: number;
	sumInsured: String;
  
  constructor(init?: Partial<Coverage>) {
    Object.assign(this, init);
  }
}
