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
import { QuoteCar } from '../objects/QuoteCar';

@Injectable()
export class QuickQuoteService {
  constructor(private app: AppService) {}

  async getFMV(carDetails: QQCar): Promise < ReturnDTO > {
    return this.app.doWhatever(carDetails, '/getFMV').then(ReturnDTO => ReturnDTO as ReturnDTO);
  }

  async getSubline(carDetails: QQCar): Promise < ReturnDTO > {
    return this.app.doWhatever(carDetails, '/getSubline').then(ReturnDTO => ReturnDTO as ReturnDTO);
  }
  
  async validatePlateNumberFormat(carDetails: QuoteCar): Promise < ReturnDTO > {
    return this.app.doWhatever(carDetails, '/validatePlateNumberFormat').then(ReturnDTO => ReturnDTO as ReturnDTO);
  }

  async validateConductionNumberFormat(carDetails: QuoteCar): Promise < ReturnDTO > {
    return this.app.doWhatever(carDetails, '/validateConductionNumberFormat').then(ReturnDTO => ReturnDTO as ReturnDTO);
  }

  async quickQuoteCar(carDetails: QQCar): Promise < ReturnDTO > {
    return this.app.doWhatever(carDetails, '/quick/quoteCar').then(ReturnDTO => ReturnDTO as ReturnDTO);
  }
}
