import {
  Injectable
} from '@angular/core';
import {
  AppService
} from './app.service';
import {
  ReturnDTO
} from '../objects/ReturnDTO';

@Injectable()
export class ThirdPartyService {
  constructor(private app: AppService) {}

  async getThirdPartyList(policyHolderType: string, firstName: string, lastName: string): Promise < ReturnDTO > {
    return this.app.post({
      policyHolderType,
      firstName,
      lastName
    }, '/thirdParty/getThirdPartyList').then(ReturnDTO => ReturnDTO as ReturnDTO);
  }
}
