import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Item} from '../../core/models/item.model';
import {OrderService} from '../../core/services/order.service';
import {BikesService} from "../../core/services/bikes.service";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  items: Item[] = [];
  totalPrice = 0;

  constructor(
    private orderService: OrderService,
    private router: Router,
    public bikeService: BikesService
  ) { }

  ngOnInit(): void {
    this.orderService.getOrderFromLocalStorage();
    this.orderService.orderChange$.subscribe(items => {
      this.items = items;
      this.totalPrice = this.orderService.getTotalPrice(items);
    });
  }

  removeItemFromOrder(id: number): void {
    this.orderService.removeItemFromOrder(id);
  }

}
