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

  async getAgentList(commercialStructure: number): Promise < any[] > {
    return this.app.doWhatever(commercialStructure, '/agent/getAgentList').then(objArr => objArr as any[]);
  }

  async getEAAgentList(agentCode: number): Promise < any[] > {
    return this.app.doWhatever({agentCode}, '/agent/getEAAgentList').then(objArr => objArr as any[]);
  }
}