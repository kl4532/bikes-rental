import { Component, OnInit } from '@angular/core';
import {OrderService} from '../core/services/order.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  loggedin = false;
  reservationForm: any;
  constructor(
    private orderService: OrderService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.reservationForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl(''),
      street: new FormControl('', Validators.required),
      zipCode: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
    });
  }

  toBasket(): void {
    this.router.navigateByUrl('basket');
  }

  onReservationSubmit() {
    console.log('resForm', this.reservationForm?.value);
  }
}
