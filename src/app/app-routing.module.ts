import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {BikeDetailComponent} from './bikes/detail/detail.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {AuthComponent} from './auth/auth.component';
import {BasketComponent} from './checkout/basket/basket.component';
import {AdminComponent} from "./admin/admin.component";
import {BikeListComponent} from "./admin/bike-list/bike-list.component";
import {OrderListComponent} from "./admin/order-list/order-list.component";

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
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'bikes', // child route path
        component: BikeListComponent,
      },
      {
        path: 'orders',
        component: OrderListComponent,
      },
    ],
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
