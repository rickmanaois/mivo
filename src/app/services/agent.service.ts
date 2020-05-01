import {
  Injectable
} from '@angular/core';
import {
  AppService
} from './app.service';
import {
  ReturnDTO
} from '../objects/ReturnDTO';
import {
  Utility
} from '../utils/utility';

@Injectable()
export class AgentService {
  constructor(private app: AppService) {}

  async getCommercialStructure(param: string): Promise < any[] > {
    return Utility.parseIntArray(await this.app.doWhatever(null, '/agent/getCommercialStructure').then(objArr => objArr as any[]), 'codNivel3');
  }

  async getAgentList(commercialStructure: number): Promise < any[] > {
    return Utility.parseIntArray(await this.app.doWhatever(commercialStructure, '/agent/getAgentList').then(objArr => objArr as any[]), 'codAgt')
  }

  async getEAAgentList(agentCode: number): Promise < any[] > {
    return this.app.doWhatever(agentCode, '/agent/getEAAgentList').then(objArr => objArr as any[]);
  }

  async getProductionAgentProfile(param: String): Promise < ReturnDTO > {
    return this.app.doWhatever(param, '/agent/getProductionAgentProfile').then(ReturnDTO => ReturnDTO as ReturnDTO);
  }
}
