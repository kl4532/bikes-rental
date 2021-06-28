import {Inject, Injectable} from '@angular/core';
import {Item} from '../models/item.model';
import {BehaviorSubject, forkJoin, Observable, of} from 'rxjs';
import {DomSanitizer} from "@angular/platform-browser";
import {HttpClient} from "@angular/common/http";
import {BikesService} from "./bikes.service";
import {Bike} from "../models/bike.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private order: Item[] = [];
  totalPrice: any;
  orderChange$: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>(this.order);
  url = `${this.baseUrl}orders`;

  private ls = window.localStorage;

  constructor(private sanitizer: DomSanitizer,
              private http: HttpClient,
              private bikeService: BikesService,
              @Inject('API_URL') private baseUrl: string) {
  }

  async addToOrder(item: Item): Promise<boolean> {
    const lsOrder = await this.getOrderFromLocalStorage() || [];

    const includes = this.order.find((old) => old.bike.id === item.bike.id);

    if (includes) {
      return false;
    }
    this.order.push(item);

    const lsItem = {
      bikeId: item.bike.id,
      dateStart: item.dateStart,
      dateEnd: item.dateEnd,
      price: item.price
    };
    lsOrder.push(lsItem);

    this.ls.setItem('order', JSON.stringify(lsOrder));
    this.orderChange$.next(this.order);
    return true;
  }

  removeItemFromOrder(id: number): void {
    this.order = this.order.filter(item => item.bike.id !== id);
    this.ls.setItem('order', JSON.stringify(this.convertOrderForLs(this.order)));
    this.orderChange$.next(this.order);
  }

  async getOrderFromLocalStorage(): Promise<any> {
    let lsOrder: any;
    if (this.ls.order) {
      const strOrder = this.ls.getItem('order') || '';
      lsOrder = JSON.parse(strOrder);
      this.order = await this.getFullOrder(lsOrder) || [];
      this.orderChange$.next(this.order);
    }
    return lsOrder;
  }

  convertOrderForLs(order: Item[]): any {
    const lsOrder: any = [];
    for (const item of order) {
      const lsItem = {
        bikeId: item.bike.id,
        dateStart: item.dateStart,
        dateEnd: item.dateEnd,
        price: item.price
      };
      lsOrder.push(lsItem);
    }
    return lsOrder;
  }

  async getFullOrder(savedOrder: any): Promise<any> {
    const obs = [];
    for (let item of savedOrder) {
        const o = this.bikeService.getBikeDetails(item.bikeId).pipe(map((bike: Bike) => {
          return item = {...item, bike};
        }));
        obs.push(o);
    }
    return await forkJoin(obs).pipe(map(items => items.map(item => item))).toPromise();
  }

  createOrder(userDetails: any, items: Item[]): Observable<any> {
    console.log('Order submitted');
    console.log('User details', userDetails);
    console.log('Order details', items);
    const order = {bookedDates: this.createBookedDates(items), user: userDetails};
    console.log(order);
    // http post request with reservation
    this.http.post(this.url, order).subscribe(
      data => console.log(data),
      err => console.log(err),
      () => console.log('Sent successfully order:', order)
    );
    return of(null);
  }

  createBookedDates(items: Item[]): any{
    const formatted = [];
    for (const item of items) {
      const bookedDate = {
        bikeId: item.bike.id,
        dateStart: item.dateStart,
        dateEnd: item.dateEnd,
        bike: item.bike
      };
      formatted.push(bookedDate);
    }
    console.log('formatted', formatted);

    return formatted;
  }

  getTotalPrice(items: Item[]): number {
    return items.reduce((acc, item) => acc + item.price, 0);
  }

}
