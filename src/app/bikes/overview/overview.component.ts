import {Component, Input, OnInit} from '@angular/core';
import {BikesService} from '../../core/services/bikes.service';
import {Observable} from 'rxjs';
import {Bike} from '../../core/models/bike.model';

@Component({
  selector: 'app-bikes-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class BikesOverviewComponent implements OnInit{

  @Input() searchForm$: any;
  searchFormValues = [];
  bikes$: Observable<Bike[]> | undefined;


  constructor(public bikesService: BikesService) { }

  ngOnInit(): void {
    this.searchForm$.subscribe((values: any) => {
      if (values) {
        this.searchFormValues = values;
        this.bikes$ = this.bikesService.getFilteredBikes(values);
      }
    });
  }


}
