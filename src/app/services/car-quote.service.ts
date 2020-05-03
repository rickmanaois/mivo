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
  QuoteCar
} from '../objects/QuoteCar';

@Injectable()
export class CarQuoteServices {
  constructor(private app: AppService) {}

  async getCoverageByProduct(carDetails: QuoteCar): Promise < ReturnDTO > {
    return this.app.post(carDetails, '/quote/getCoverageByProduct').then(ReturnDTO => ReturnDTO as ReturnDTO);
  }
}
