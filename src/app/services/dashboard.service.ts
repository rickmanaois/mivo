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
export class DashboardService {
  constructor(private app: AppService) {}

  async getForeignExchange(): Promise < ReturnDTO > {
    return this.app.get('/dashboard/getForeignExchange').then(ReturnDTO => ReturnDTO as ReturnDTO);
  }
}
