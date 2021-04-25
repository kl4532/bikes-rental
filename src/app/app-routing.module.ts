import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {BikeDetailComponent} from './bikes/detail/detail.component';
import {CheckoutComponent} from './checkout/checkout.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'bike/:id',
    component: BikeDetailComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
