import {
  Injectable
} from '@angular/core';
import {
  LovService
} from '.././lov.service';

import {
  LOV
} from '../../objects/LOV';

@Injectable()
export class HomeLOVServices {
  constructor(private lov: LovService) {}

  async getHomeBusinessLine(): Promise < any[] > {
    const dto = new LOV('A1001800', '92', 'cod_cia~1|cod_sector~2');
    return this.lov.getLOV(dto).then(lovs => lovs as any[]);
  }
}
