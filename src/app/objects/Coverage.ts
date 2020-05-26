export class Coverage {
  included: boolean;
  code: number;
  sumInsured: string;

  constructor(init ? : Partial < Coverage > ) {
    Object.assign(this, init);
  }
}
