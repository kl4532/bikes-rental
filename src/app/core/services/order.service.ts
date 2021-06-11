import {Inject, Injectable} from '@angular/core';
import {Item} from '../models/item.model';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {DomSanitizer} from "@angular/platform-browser";
import {HttpClient} from "@angular/common/http";

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
              @Inject('API_URL') private baseUrl: string) { }

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
