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
  AgentService
} from './agent.service';
import {
  DashboardService
} from './dashboard.service';
import {
  UtilityService
} from './utility.service';

/* LOV Services */
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

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: [],
  providers: [
    BsModalRef, //bmr
    TranslateService, //ts
    AppService, //apps
    AuthenticationService, //auths
    QuickQuoteService, //qqs
    CarUtilityServices, //cus
    CarQuoteServices, //cqs
    AgentService, //as
    DashboardService, //ds
    UtilityService, //us

    LovService, //ls
    GroupPolicyLOVServices, //gpls
    CarLOVServices, //cls
    HomeLOVServices, //hls
    TravelLOVServices, //tls
    AccidentLOVServices //als
  ]
})
export class ServiceModule {}
