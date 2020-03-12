import {
  Injectable
} from '@angular/core';
import {
  LovService
} from '../../services/lov.service';

import {
  LOV
} from '../../objects/LOV';
import { GroupPolicy } from 'src/app/objects/GroupPolicy';

@Injectable()
export class GroupPolicyLOVServices {
  constructor(private lov: LovService) {}

  // TODO
  async getCommercialStructure() : Promise < any[] > {
    const dto = new LOV('A1000710', '2', 'COD_CIA~1' + '|COD_AGT~1101');
    return this.lov.getIntLOV(dto, 'COD_NIVEL3').then(lovs => lovs as any[]);
  }

  async getGroupPolicy(subline: number) : Promise < any[] > {
    const dto = new LOV(
      'A2000010',
      '4',
      'COD_CIA~1' +
      '|COD_AGT~1101' + 
      '|COD_RAMO~' + subline);
    return this.lov.getIntLOV(dto, 'NUM_POLIZA').then(lovs => lovs as any[]);
  }

  async getContract(subline: number, groupPolicy: GroupPolicy) : Promise < any[] > {
    const dto = new LOV(
      'G2990001',
      '7',
      'COD_CIA~1' +
      '|COD_AGT~1101' + 
      '|COD_RAMO~' + subline +
      '|NUM_POLIZA_GRUPO~' + groupPolicy.groupPolicy);
    return this.lov.getIntLOV(dto, 'NUM_CONTRATO').then(lovs => lovs as any[]);
  }

  async getSubContract(subline: number, groupPolicy: GroupPolicy) : Promise < any[] > {
    const dto = new LOV(
      'G2990022',
      '2',
      'COD_CIA~1' +
      '|COD_AGT~1101' + 
      '|COD_RAMO~' + subline +
      '|NUM_CONTRATO~' + groupPolicy.contract);
    return this.lov.getIntLOV(dto, 'NUM_SUBCONTRATO').then(lovs => lovs as any[]);
  }
}
