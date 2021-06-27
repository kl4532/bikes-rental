import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BikesService} from '../core/services/bikes.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {BikeFormFields} from "../core/models/bikeFormFields.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  mockBikesTypes = ['road', 'mountain', 'city', 'electric', 'mtb'];
  searchForm: any;

  isSubmitted = new BehaviorSubject(this.bikeService.searchForm);
  formSubmission$ = this.isSubmitted.asObservable();

  minDate = new Date();
  formFields$: Observable<BikeFormFields> | undefined;

  constructor(private bikeService: BikesService) { }

  ngOnInit(): void {
    this.formFields$ = this.bikeService.getBikeFormFields();
    this.minDate = new Date();
    // this.maxDate = new Date(new Date().getTime() + (maxPeriod * 24 * 60 * 60 * 1000));


    this.searchForm = new FormGroup({
      bikeTypes: new FormControl(this.bikeService.searchForm?.bikeTypes || '', Validators.required),
      dateStart: new FormControl(this.bikeService.searchForm?.dateStart || '', Validators.required),
      dateEnd: new FormControl(this.bikeService.searchForm?.dateEnd || '', Validators.required),
      maxPrice: new FormControl(this.bikeService.searchForm?.maxPrice || '')
    });
  }

  onSubmit(): void {
    this.isSubmitted.next(this.searchForm.value);
  }



  calculateRange() {
    // TOFIX set date range dynamically from selected min + 14 days
    // this.maxDate = new Date(selected + (14 * 24 * 60 * 60 * 1000));
  }


}
