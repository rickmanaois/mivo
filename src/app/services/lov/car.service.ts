import {
  Injectable
} from '@angular/core';
import {
  LovService
} from '../../services/lov.service';

import {
  LOV
} from '../../objects/LOV';

@Injectable()
export class CarLOVServices {
  constructor(private lov: LovService) {}

  makeLove: any[];

  async getMakeList() : Promise < any[] > {
    const dto = new LOV('A2100400', '3', 'COD_CIA~1');
    return this.lov.getLOV(dto).then(lovs => lovs as any[]);
  }

  async getModelList(carDetails : any) : Promise < any[] > {
    const dto = new LOV(
      'A2100410',
      '4',
      '|COD_MARCA~' + carDetails.make +
      '|NUM_COTIZACION~1|COD_CIA~1');
    return this.lov.getLOV(dto).then(lovs => lovs as any[]);
  }

  async getVehicleTypeList(carDetails : any) : Promise < any[] > {
    const dto = new LOV(
      'A2100100',
      '2',
      '|COD_MARCA~' + carDetails.make +
      '|COD_MODELO~' + carDetails.model +
      '|NUM_COTIZACION~1|COD_CIA~1');
    return this.lov.getLOV(dto).then(lovs => lovs as any[]);
  }

  getModelYearList(carDetails : any) : Promise < any[] > {
    const dto = new LOV(
      'A2100430',
      '4',
      '|COD_MARCA~' + carDetails.make +
      '|COD_MODELO~' + carDetails.model +
      '|COD_TIP_VEHI~' + carDetails.vehicleType +
      '|NUM_COTIZACION~1|COD_CIA~1');
    return this.lov.getLOV(dto).then(lovs => lovs as any[]);
  }

  getSubModelList(carDetails : any) : Promise < any[] > {
    const dto = new LOV(
      'A2100420',
      '4',
      '|COD_MARCA~' + carDetails.make +
      '|COD_MODELO~' + carDetails.model +
      '|COD_TIP_VEHI~' + carDetails.vehicleType +
      '|ANIO_SUB_MODELO~' + carDetails.modelYear +
      '|NUM_COTIZACION~1|COD_CIA~1');
    return this.lov.getLOV(dto).then(lovs => lovs as any[]);
  }

  getTypeOfUseList(carDetails : any) : Promise < any[] > {
    const dto = new LOV(
      'A2100200',
      '4',
      '|COD_MARCA~' + carDetails.make +
      '|COD_MODELO~' + carDetails.model +
      '|COD_TIP_VEHI~' + carDetails.vehicleType +
      '|ANIO_SUB_MODELO~' + carDetails.modelYear +
      '|NUM_COTIZACION~1|COD_CIA~1');
    return this.lov.getLOV(dto).then(lovs => lovs as any[]);
  }
}
