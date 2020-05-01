import {
  Injectable
} from '@angular/core';
import {
  AppService
} from './app.service';
import { HttpParams } from '@angular/common/http';
import { ReturnDTO } from '../objects/ReturnDTO';

@Injectable()
export class AgentService {
  constructor(private app: AppService) {}

  async getCommercialStructure(param : string): Promise < any[] > {
    return this.parseIntArray(await this.app.doWhatever(null, '/agent/getCommercialStructure').then(objArr => objArr as any[]), 'codNivel3');
    //return this.app.doWhatever(null, '/agent/getCommercialStructure').then(objArr => objArr as any[]);
  }

  async getAgentList(commercialStructure: number): Promise < any[] > {
    return this.parseIntArray(await this.app.doWhatever(commercialStructure, '/agent/getAgentList').then(objArr => objArr as any[]), 'codAgt')
    //return this.app.doWhatever(commercialStructure, '/agent/getAgentList').then(objArr => objArr as any[]);
  }

  async getEAAgentList(agentCode: number): Promise < any[] > {
    return this.app.doWhatever(agentCode, '/agent/getEAAgentList').then(objArr => objArr as any[]);
  }

  async getProductionAgentProfile(param: String): Promise < ReturnDTO > {
    return this.app.doWhatever(param, '/agent/getProductionAgentProfile').then(ReturnDTO => ReturnDTO as ReturnDTO);
  }

  private parseIntArray(arr: any[], param: string) {
    arr.forEach(a => {
      a[param] = parseInt(a[param]);
    });
    return arr;
  }
}
