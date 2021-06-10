import { Injectable } from '@angular/core';
import {Item} from '../models/item.model';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private order: Item[] = [];
  totalPrice: any;
  orderChange$: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>(this.order);

  private ls = window.localStorage;

  constructor(private sanitizer: DomSanitizer) { }

  addToOrder(item: Item): void {
    this.getOrderFromLocalStorage();
    this.order.push(item);
    this.ls.setItem('order', JSON.stringify(this.order));
    this.orderChange$.next(this.order);
  }

  removeItemFromOrder(id: number): void {
    this.order = this.order.filter(item => item.bike.id !== id);
    this.ls.setItem('order', JSON.stringify(this.order));
    this.orderChange$.next(this.order);
  }

  getOrderFromLocalStorage(): void {
    let savedOrder: Item[];
    if (this.ls.order) {
      const strOrder = this.ls.getItem('order') || '';
      savedOrder = JSON.parse(strOrder);
      for (const item of savedOrder) {
        const url = item.bike.picture.changingThisBreaksApplicationSecurity;
        item.bike.picture = this.sanitizer.bypassSecurityTrustUrl(url);
      }
      this.order = savedOrder || [];
    }
    this.orderChange$.next(this.order);
  }

  createOrder(userDetails: any, items: Item[]): Observable<any> {
    console.log('Order submitted');
    console.log('User details', userDetails);
    console.log('Order details', items);
    const order = {items, user: userDetails};
    // http post request with reservation
    return of(null);
  }

  getTotalPrice(items: Item[]): number {
    return items.reduce((acc, item) => acc + item.price, 0);
  }

}
