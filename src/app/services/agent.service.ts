import {
  Injectable
} from '@angular/core';
import {
  AppService
} from './app.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class AgentService {
  constructor(private app: AppService) {}

  async getCommercialStructure(): Promise < any[] > {
    return this.app.doWhatever(null, '/agent/getCommercialStructure').then(objArr => objArr as any[]);
  }

  async getAgentList(commercialStructure: any): Promise < any[] > {
    const params = new HttpParams()
    .set('commercialStructure', commercialStructure);

    return this.app.doWhatever({params}, '/agent/getAgentList').then(objArr => objArr as any[]);
  }ß

  async getEAAgentList(agentCode: number): Promise < any[] > {
    return this.app.doWhatever({agentCode}, '/agent/getEAAgentList').then(objArr => objArr as any[]);
  }
}
