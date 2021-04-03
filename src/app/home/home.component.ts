import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  mockBikesTypes = ['road', 'mountain', 'city', 'electric', 'mtb'];
  searchForm: any;
  formSubmited = false;

  minDate = new Date();
  maxDate = new Date();

  constructor() { }

  ngOnInit(): void {
    const maxPeriod = 60;
    this.minDate = new Date();
    this.maxDate = new Date(new Date().getTime() + (maxPeriod * 24 * 60 * 60 * 1000));


    this.searchForm = new FormGroup({
      bikeTypes: new FormControl('', Validators.required),
      dateStart: new FormControl('', Validators.required),
      dateEnd: new FormControl('', Validators.required),
      maxPrice: new FormControl('')
    });
  }

  onSubmit() {
    console.warn(this.searchForm);
    this.formSubmited = true;
  }

  calculateRange() {
    // TOFIX set date range dynamically from selected min + 14 days
    // this.maxDate = new Date(selected + (14 * 24 * 60 * 60 * 1000));
  }


}
