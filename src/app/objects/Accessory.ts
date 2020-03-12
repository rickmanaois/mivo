export class Accessory {
  accessory: String;
	accessoryType: String;
	price: number;
  description: String;
  
  constructor(init?: Partial<Accessory>) {
    Object.assign(this, init);
  }
}
