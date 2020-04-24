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

/* Services */
import {
  AppService
} from './app.service';
import {
  AuthenticationService
} from './authentication.service';
import {
  QuickQuoteService
} from './quickquote.service';
import {
  CarUtilityServices
} from './car-utility.service';
import {
  CarQuoteServices
} from './car-quote.service';
import {
  LovService
} from './lov.service';

/* LOV Services */
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
    AuthenticationService,
    QuickQuoteService,
    CarUtilityServices,
    CarQuoteServices,
    LovService,

    GroupPolicyLOVServices,
    CarLOVServices,
    HomeLOVServices,
    TravelLOVServices,
    AccidentLOVServices
  ]
})
export class ServiceModule {}
