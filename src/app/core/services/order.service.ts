import { Injectable } from '@angular/core';
import {Item} from '../models/item.model';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private order: Item[] = [];
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
    console.log('id', id);
    this.order = this.order.filter(item => item.id !== id);
    this.ls.setItem('order', JSON.stringify(this.order));
    this.orderChange$.next(this.order);
  }

  getOrder(): void {
    this.getOrderFromLocalStorage();
    this.orderChange$.next(this.order);
    // return this.order;
  }

  getOrderFromLocalStorage(): void {
    let savedOrder;
    if (this.ls.order) {
      const strOrder = this.ls.getItem('order') || '';
      savedOrder = JSON.parse(strOrder);
      this.order = savedOrder || [];
    }
  }
}
