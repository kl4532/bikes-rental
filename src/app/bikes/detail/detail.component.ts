import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
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
  rentForm: any;
  minDate = new Date();
  maxDate = new Date();
  rentalTime: string[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private bikesService: BikesService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.bike$ = this.bikesService.getBikeDetails(param.id);
    });

    const maxPeriod = 60;
    this.minDate = new Date();
    this.maxDate = new Date(new Date().getTime() + (maxPeriod * 24 * 60 * 60 * 1000));

    // fill hours
    this.fillTime(9.00, 18.00, 15);


    this.rentForm = new FormGroup({
      bikeTypes: new FormControl('', Validators.required),
      dateStart: new FormControl('', Validators.required),
      dateEnd: new FormControl('', Validators.required),
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

}
