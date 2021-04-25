import { Component, OnInit } from '@angular/core';
import {Item} from '../core/models/item.model';
import {OrderService} from '../core/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  items: Item[] = [];
  totalPrice = 0;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    // this.items = this.orderService.getOrder();
    this.orderService.orderChange$.subscribe(items => this.items = items);

    if (this.items) {
      console.log('items', this.items);
      this.totalPrice = this.items.reduce((acc, item) => acc + item.price, 0);
    }
  }

}
