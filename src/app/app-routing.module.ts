import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {BikeDetailComponent} from './bikes/detail/detail.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {AuthComponent} from './auth/auth.component';
import {BasketComponent} from './checkout/basket/basket.component';

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
    path: 'basket',
    component: BasketComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'login',
    component: AuthComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
