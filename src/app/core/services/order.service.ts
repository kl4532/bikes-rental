import { Injectable } from '@angular/core';
import {Item} from '../models/item.model';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private order: Item[] = [];
  totalPrice: any;
  orderChange$: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>(this.order);

  private ls = window.localStorage;

  constructor() { }

  addToOrder(item: Item): void {
    this.getOrderFromLocalStorage();
    this.order.push(item);
    this.ls.setItem('order', JSON.stringify(this.order));
    this.orderChange$.next(this.order);
  }

  removeItemFromOrder(id: string): void {
    this.order = this.order.filter(item => item.id !== id);
    this.ls.setItem('order', JSON.stringify(this.order));
    this.orderChange$.next(this.order);
  }

  getOrderFromLocalStorage(): void {
    let savedOrder;
    if (this.ls.order) {
      const strOrder = this.ls.getItem('order') || '';
      savedOrder = JSON.parse(strOrder);
      this.order = savedOrder || [];
    }
    this.orderChange$.next(this.order);
  }

  finalizeOrder(userDetails: any, order: Item[]): Observable<any> {
    console.log('Order submitted');
    console.log('User details', userDetails);
    console.log('Order details', order);
    // http post request with reservation
    return of(null);
  }

  getTotalPrice(items: Item[]): number {
    return items.reduce((acc, item) => acc + item.price, 0);
  }

}
