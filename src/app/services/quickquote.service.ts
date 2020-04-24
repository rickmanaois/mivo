import {
  Injectable
} from '@angular/core';
import {
  AppService
} from './app.service';
import {
  QQCar
} from '../objects/QQCar';
import {
  QQHome
} from '../objects/QQHome';
import {
  ReturnDTO
} from '../objects/ReturnDTO';
import {
  QQTravel
} from '../objects/QQTravel';
import {
  QQAccident
} from '../objects/QQAccident';

@Injectable()
export class QuickQuoteService {
  constructor(private app: AppService) {}

  async quickQuoteCar(carDetails: QQCar): Promise < ReturnDTO > {
    return this.app.doWhatever(carDetails, '/quickquote/car').then(ReturnDTO => ReturnDTO as ReturnDTO);
  }

  async checkRoadAssist(carDetails: QQCar): Promise < ReturnDTO > {
    return this.app.doWhatever(carDetails, '/quickquote/checkRoadAssist').then(ReturnDTO => ReturnDTO as ReturnDTO);
  }

  async quickQuoteHome(homeDetails: QQHome): Promise < ReturnDTO > {
    return this.app.doWhatever(homeDetails, '/quickquote/home').then(ReturnDTO => ReturnDTO as ReturnDTO);
  }

  async quickQuoteTravel(travelDetails: QQTravel): Promise < ReturnDTO > {
    return this.app.doWhatever(travelDetails, '/quickquote/travel').then(ReturnDTO => ReturnDTO as ReturnDTO);
  }

  async quickQuoteAccident(accidentDetails: QQAccident): Promise < ReturnDTO > {
    return this.app.doWhatever(accidentDetails, '/quickquote/accident').then(ReturnDTO => ReturnDTO as ReturnDTO);
  }
}
