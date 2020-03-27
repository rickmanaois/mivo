import {
  Injectable
} from '@angular/core';
import {
  AppService
} from '../services/app.service';
import {
  LOV
} from '../objects/LOV';
import {
  OptionList
} from '../objects/OptionList';

@Injectable()
export class LovService {
  constructor(private app: AppService) {}

  async getLOV(dto: LOV): Promise < any[] > {
    return this.app.doWhatever(dto, '/getLOV').then(objArr => objArr as any[]);
  }

  async getIntLOV(dto: LOV, param: string): Promise < any[] > {
    return this.parseIntArray(await this.app.doWhatever(dto, '/getLOV').then(objArr => objArr as any[]), param);
  }

  async getOptionList(dto: OptionList): Promise < any[] > {
    return this.app.doWhatever(dto, '/getOptionList').then(objArr => objArr as any[]);
  }

  async getIntOptionList(dto: OptionList, param: string): Promise < any[] > {
    return this.parseIntArray(await this.app.doWhatever(dto, '/getOptionList').then(objArr => objArr as any[]), param);
  }

  private parseIntArray(arr: any[], param: string) {
    arr.forEach(a => {
      a[param] = parseInt(a[param]);
    });
    return arr;
  }
}
