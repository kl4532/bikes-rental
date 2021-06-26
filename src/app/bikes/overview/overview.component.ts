import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BikesService} from '../../core/services/bikes.service';
import {Observable, Subscription} from 'rxjs';
import {Bike} from '../../core/models/bike.model';

@Component({
  selector: 'app-bikes-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class BikesOverviewComponent implements OnInit, OnDestroy{

  @Input() searchForm$: any;
  searchFormValues = [];
  bikes$: Observable<Bike[]> | undefined;
  sub: Subscription | undefined;

  constructor(public bikesService: BikesService) { }

  ngOnInit(): void {
    this.sub = this.searchForm$.subscribe((values: any) => {
      if (values) {
        this.searchFormValues = values;
        this.bikes$ = this.bikesService.getFilteredBikes(values);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
