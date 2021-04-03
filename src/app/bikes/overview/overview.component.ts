import { Component, OnInit } from '@angular/core';
import {BikesService} from '../../core/services/bikes.service';

@Component({
  selector: 'app-bikes-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class BikesOverviewComponent implements OnInit {

  constructor(public bikesService: BikesService) { }

  ngOnInit(): void {
  }

}
