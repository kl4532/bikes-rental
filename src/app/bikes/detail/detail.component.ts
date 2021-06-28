import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Bike} from '../../core/models/bike.model';
import {BikesService} from '../../core/services/bikes.service';
import {Observable, Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OrderService} from '../../core/services/order.service';

@Component({
  selector: 'app-bike-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class BikeDetailComponent implements OnInit, OnDestroy{

  bike: any;
  rentForm: any;
  minDate = new Date();
  maxDate = new Date();
  totalPrice: any;
  rentalTime: string[] = [];
  sub: Subscription | undefined;
  validators: any = {};

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private bikesService: BikesService,
              private orderService: OrderService) {
    this.validators = {
      isInBasket: false,
      dateTime: false
    };
  }

  ngOnInit(): void {
    // @ts-ignore
    const bikeId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.sub = this.bikesService.getBikeDetails(bikeId).subscribe(bike => {
      this.bike = bike;
      this.calcTotalPrice();
    });
    this.minDate = new Date();

    // fill hours
    this.fillTime(9.00, 18.00, 15);

    this.rentForm = new FormGroup({
      dateStart: new FormControl(this.bikesService.searchForm?.dateStart || this.minDate, Validators.required),
      dateEnd: new FormControl(this.bikesService.searchForm?.dateEnd || this.minDate, Validators.required),
      price: new FormControl(''),
      timeStart: new FormControl('9.00', Validators.required),
      timeEnd: new FormControl('18.00', Validators.required)
    });
  }

  fillTime(min: number, max: number, step: number): void {
    let t = min;

    while (t <= max) {
      const int = Math.trunc(t);
      const dec = +((t % 1) * 0.6).toFixed(2);
      const num = (int + dec).toFixed(2);
      this.rentalTime.push(num);
      t = +t + step/60;
    }
  }

  calcTotalPrice(): void {
    const timeSpan = (new Date(this.rentForm.value.dateEnd).getTime() - new Date(this.rentForm.value.dateStart).getTime())/(24*3600*1000) + 1;
    this.totalPrice = +timeSpan.toFixed() * this.bike.price;
    this.rentForm.patchValue({price: this.totalPrice});
  }

  async addItemToOrder(): Promise<boolean> {
    const dates = this.mergeDateTime();
    if (!dates) {
      this.validators.dateTime = true;
      return false;
    }
    const item = {bike: this.bike, ...dates,  price: this.rentForm.value.price,};
    const orderAdded = await this.orderService.addToOrder(item);
    if (!orderAdded) {
      this.validators.isInBasket = true;
      return false;
    }
    return true ;
  }

  mergeDateTime(): any {
    const timeStart = this.rentForm.value.timeStart.split('.');
    const timeEnd = this.rentForm.value.timeEnd.split('.');

    const dateStart = this.rentForm.value.dateStart.setHours(timeStart[0], timeStart[1], 0);
    const dateEnd = this.rentForm.value.dateEnd.setHours(timeEnd[0], timeEnd[1], 0);
    if (dateStart > dateEnd) {
      return false;
    }
    return {dateStart: new Date(dateStart), dateEnd: new Date(dateEnd)};
  }

  async onSubmit(destinationComponent: string): Promise<void>{
    if (await this.addItemToOrder()) {
      await this.router.navigate([destinationComponent]);
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
