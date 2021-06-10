import { Component, OnInit } from '@angular/core';
import {OrderService} from '../core/services/order.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Item} from "../core/models/item.model";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  loggedIn = false;
  reservationForm: any;
  order: Item[] = [];
  totalPrice: any;
  tabIndex = 0;
  constructor(
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.orderService.orderChange$.subscribe(items => {
      this.order = items;
      this.totalPrice = this.orderService.getTotalPrice(items);
    });

    this.reservationForm = new FormGroup({
      firstName: new FormControl('testName', Validators.required),
      lastName: new FormControl('testLastName', Validators.required),
      email: new FormControl('asdas@test.com', Validators.required),
      phone: new FormControl('90323423423'),
      street: new FormControl('Street 123', Validators.required),
      zipCode: new FormControl('123-23992', Validators.required),
      city: new FormControl('Moskow', Validators.required),
      country: new FormControl('Russia', Validators.required),
    });
  }

  toBasket(): void {
    this.router.navigateByUrl('basket');
  }

  onOrderSubmit(): void {
    const userDetails = this.reservationForm?.value;
    this.orderService.createOrder(userDetails, this.order);
    console.log('resForm', this.reservationForm?.value);
  }

  // onNextClick(): void {
  //
  // }
}
