import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Bike} from '../../core/models/bike.model';
import {BikesService} from '../../core/services/bikes.service';
import {Observable} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-bike-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class BikeDetailComponent implements OnInit {

  bike$: Observable<Bike> | undefined;
  bike: any;
  rentForm: any;
  minDate = new Date();
  maxDate = new Date();
  totalPrice: any;
  rentalTime: string[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private bikesService: BikesService) { }

  ngOnInit(): void {
    const bikeId = this.activatedRoute.snapshot.paramMap.get('id') || '';

    this.bikesService.getBikeDetails(bikeId).subscribe(bike => {
      this.bike = bike;
      this.calcTotalPrice();
    });
    this.minDate = new Date();

    // fill hours
    this.fillTime(9.00, 18.00, 15);

    this.rentForm = new FormGroup({
      dateStart: new FormControl(this.bikesService.searchForm?.dateStart || this.minDate, Validators.required),
      dateEnd: new FormControl(this.bikesService.searchForm?.dateEnd || this.minDate, Validators.required),
      price: new FormControl('')
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

  onSubmit() {
    console.log({...this.rentForm.value, id: this.bike.id});
    // this.router.navigate(['checkout']);
  }

  addToOrderList() {

    this.router.navigate(['']);
  }
}
