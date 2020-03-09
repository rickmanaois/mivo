import {
  Injectable
} from '@angular/core';
import {
  LovService
} from '../../services/lov.service';
import {
  LOV
} from '../../objects/LOV';

@Injectable()
export class AccidentLOVServices {
  constructor(private lov: LovService) {}

  async getSubline() : Promise < any[] > {
    const dto = new LOV('A1001800', '93', '');
    return this.lov.getLOV(dto).then(lovs => lovs as any[]);
  }

  async getOccupationalClass() : Promise < any[] > {
    const dto = new LOV(
      'G2990006',
      '1',
      '|cod_ramo~323' +
      '|cod_modalidad~99999' +
      '|cod_campo~COD_OCCUPATIONAL_CLASS' + 
      '|fec_validez~01012016');
    return this.lov.getLOV(dto).then(lovs => lovs as any[]);
  }
}
