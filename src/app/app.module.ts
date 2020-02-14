import {
  BrowserModule
} from '@angular/platform-browser';
import {
  NgModule
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import {
  HttpClientModule
} from '@angular/common/http';
import {
  AppRoutingModule
} from './app-routing.module';
import {
  AppComponent
} from './app.component';
import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import {
  BsDatepickerModule
} from 'ngx-bootstrap/datepicker';
import {
  NgMultiSelectDropDownModule
} from 'ng-multiselect-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
} from '@angular/material';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {
  ServiceModule
} from './services/service.module';

//login component
import {
  LoginComponent
} from './components/login/login.component';

//page component
import {
  DashboardComponent
} from './components/dashboard/dashboard.component';
import {
  FooterComponent
} from './components/footer/footer.component';
import {
  HeaderComponent
} from './components/header/header.component';
import {
  SidenavComponent
} from './components/sidenav/sidenav.component';
import {
  TemplateComponent
} from './components/template/template.component';

//other feature components
import {
  MissingPageComponent
} from './components/missing-page/missing-page.component';
import {
  ProfileComponent
} from './components/profile/profile.component';
import {
  QueryComponent
} from './components/query/query.component';
import {
  FaqComponent
} from './components/faq/faq.component';

//table list components
import {
  OutstandingBillsComponent
} from './components/outstanding-bills/outstanding-bills.component';

// quotation components
import {
  QuotationCarComponent
} from './components/quotation-car/quotation-car.component';
import {
  QuotationHomeComponent
} from './components/quotation-home/quotation-home.component';
import {
  QuotationTravelComponent
} from './components/quotation-travel/quotation-travel.component';
import {
  QuotationAccidentComponent
} from './components/quotation-accident/quotation-accident.component';
import {
  QuickQuotationCarComponent
} from './components/quick-quotation-car/quick-quotation-car.component';
import {
  QuickQuotationHomeComponent
} from './components/quick-quotation-home/quick-quotation-home.component';
import {
  QuickQuotationTravelComponent
} from './components/quick-quotation-travel/quick-quotation-travel.component';
import {
  QuickQuotationAccidentComponent
} from './components/quick-quotation-accident/quick-quotation-accident.component';
import { NgHttpLoaderModule } from 'ng-http-loader';

const appRoutes: Routes = [{
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'mivo',
    component: TemplateComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    SidenavComponent,
    TemplateComponent,
    FaqComponent,
    OutstandingBillsComponent,
    QueryComponent,
    MissingPageComponent,
    ProfileComponent,
    QuotationCarComponent,
    QuotationHomeComponent,
    QuotationTravelComponent,
    QuotationAccidentComponent,
    QuickQuotationCarComponent,
    QuickQuotationHomeComponent,
    QuickQuotationTravelComponent,
    QuickQuotationAccidentComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ServiceModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    NgHttpLoaderModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
