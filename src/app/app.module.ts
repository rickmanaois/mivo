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
  LoginComponent
} from './components/login/login.component';
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
import {
  FaqComponent
} from './components/faq/faq.component';
import {
  OutstandingBillsComponent
} from './components/outstanding-bills/outstanding-bills.component';
import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import {
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
} from '@angular/material';
import {
  QuotationCarComponent
} from './components/quotation-car/quotation-car.component';
import {
  QueryComponent
} from './components/query/query.component';
import {
  MissingPageComponent
} from './components/missing-page/missing-page.component';
import {
  ProfileComponent
} from './components/profile/profile.component';
import {
  RouterModule,
  Routes
} from '@angular/router';

/*Services*/
import
QuickQuoteService
from './services/quickqoute.service';
import {
  AppService
} from './services/app.service';
import {
  LovService
} from './services/lov.service';

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
    QueryComponent,
    MissingPageComponent,
    ProfileComponent
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
    HttpClientModule
  ],
  providers: [QuickQuoteService, AppService, LovService],
  bootstrap: [AppComponent]
})
export class AppModule {}
