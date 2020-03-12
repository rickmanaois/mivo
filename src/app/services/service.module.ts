import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  BsModalRef
} from 'ngx-bootstrap/modal';
import {
  TranslateService
} from '@ngx-translate/core';
/*Services*/
import {
  AppService
} from './app.service';
import {
  LovService
} from './lov.service';
import {
  GroupPolicyLOVServices
} from './lov/group-policy.service';
import {
  CarLOVServices
} from './lov/car.service';
import {
  HomeLOVServices
} from './lov/home.service';
import {
  TravelLOVServices
} from './lov/travel.service';
import {
  AccidentLOVServices
} from './lov/accident.service';

import {
  QuickQuoteService
} from './quickqoute.service';
import {
  CarQuoteServices
} from './car-quote.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: [],
  providers: [
    BsModalRef,
    TranslateService,
    AppService,
    QuickQuoteService,
    GroupPolicyLOVServices,
    CarLOVServices,
    TravelLOVServices,
    HomeLOVServices,
    AccidentLOVServices,
    LovService,
    CarQuoteServices,
  ]
})
export class ServiceModule {}
