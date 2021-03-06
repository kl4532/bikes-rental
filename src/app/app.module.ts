import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { LayoutHeaderComponent } from './shared/layout/layout-header/layout-header.component';
import { LayoutFooterComponent } from './shared/layout/layout-footer/layout-footer.component';
import { MaterialModule } from './shared/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import { BikesOverviewComponent } from './bikes/overview/overview.component';
import {HttpClientModule} from '@angular/common/http';
import {environment} from '../environments/environment';
import { BikeDetailComponent } from './bikes/detail/detail.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AuthComponent } from './auth/auth.component';
import { BasketComponent } from './checkout/basket/basket.component';
import { AdminComponent } from './admin/admin.component';
import { BikeListComponent } from './admin/bike-list/bike-list.component';
import { OrderListComponent } from './admin/order-list/order-list.component';
import { BikeEditorComponent } from './admin/bike-editor/bike-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutHeaderComponent,
    LayoutFooterComponent,
    BikesOverviewComponent,
    BikeDetailComponent,
    CheckoutComponent,
    AuthComponent,
    BasketComponent,
    AdminComponent,
    BikeListComponent,
    OrderListComponent,
    BikeEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: 'API_URL',
      useValue: environment.API_URL
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
