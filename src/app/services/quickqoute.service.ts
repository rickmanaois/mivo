import {
  Injectable
} from '@angular/core';
import {
  AppService
} from '../services/app.service';
import {
  QQCar
} from '../objects/QQCar';
import { ReturnDTO } from '../objects/ReturnDTO';

@Injectable()
export class QuickQuoteService {
  constructor(private app: AppService) {}

  async getFMV(carDetails: QQCar): Promise < ReturnDTO > {
    return this.app.doWhatever(carDetails, '/getFMV').then(ReturnDTO => ReturnDTO as ReturnDTO);
  }

  async getSubline(carDetails: QQCar): Promise < ReturnDTO > {
    return this.app.doWhatever(carDetails, '/getSubline').then(ReturnDTO => ReturnDTO as ReturnDTO);
  }

  async car(carDetails: QQCar): Promise < any[] > {
    return this.app.doWhatever(carDetails, '/quickQuoteCar').then(objArr => objArr as any[]);
  }
}
