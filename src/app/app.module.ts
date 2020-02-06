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

// RECOMMENDED
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

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
import { QuotationTravelComponent } from './components/quotation-travel/quotation-travel.component';
import { QuotationAccidentComponent } from './components/quotation-accident/quotation-accident.component';
import { QuickQuotationCarComponent } from './components/quick-quotation-car/quick-quotation-car.component';

const appRoutes: Routes = [{
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'template',
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
    QuotationCarComponent,
    QuotationHomeComponent,
    QueryComponent,
    MissingPageComponent,
    ProfileComponent,
    QuotationTravelComponent,
    QuotationAccidentComponent,
    QuickQuotationCarComponent
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
    BsDatepickerModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
