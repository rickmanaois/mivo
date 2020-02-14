import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
/*Services*/
import {
  AppService
} from './app.service';
import {
  LovService
} from './lov.service';
import {
  CarLOVServices
} from './lov/car.service';
import 
  { QuickQuoteService }
from './quickqoute.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: [],
  providers: [
    AppService,
    QuickQuoteService,
    CarLOVServices,
    LovService,
  ]
})
export class ServiceModule {}
