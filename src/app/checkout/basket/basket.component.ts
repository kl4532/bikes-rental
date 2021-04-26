import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Item} from '../../core/models/item.model';
import {OrderService} from '../../core/services/order.service';

@Component({
  selector: 'app-bakset',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  items: Item[] = [];
  totalPrice = 0;

  constructor(
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.orderService.orderChange$.subscribe(items => {
      this.items = items;
      if (this.items) {
        console.log('items', this.items);
        this.totalPrice = this.items.reduce((acc, item) => acc + item.price, 0);
      }
    });
  }

  removeItemFromOrder(id: string): void {
    this.orderService.removeItemFromOrder(id);
  }

  toCheckout() {
    this.router.navigateByUrl('checkout');
  }

}
