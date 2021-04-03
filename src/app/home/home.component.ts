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

  constructor() { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      bikeTypes: new FormControl('', Validators.required),
      dateStart: new FormControl('', Validators.required),
      dateEnd: new FormControl('', Validators.required)
    });
  }
  onSubmit() {
    console.warn(this.searchForm);
    this.formSubmited = true;
  }

}
