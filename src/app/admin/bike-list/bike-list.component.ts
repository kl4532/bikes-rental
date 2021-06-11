import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {BikesService} from "../../core/services/bikes.service";
import {Bike} from "../../core/models/bike.model";

@Component({
  selector: 'app-bike-list',
  templateUrl: './bike-list.component.html',
  styleUrls: ['./bike-list.component.scss']
})
export class BikeListComponent implements OnInit {

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  // @ts-ignore
  dataSource: MatTableDataSource<Bike>;
  displayedColumns: string[] = ['id', 'name', 'status', 'action'];
  bikes: Bike[] = [];

  constructor(public bikeService: BikesService) {}

  ngOnInit(): void {
    this.bikeService.changesSubject.subscribe(() => {
      this.bikeService.bikes$.subscribe(bikes => {
        this.dataSource = new MatTableDataSource(bikes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  remove(id: number): void {
    this.bikeService.removeBike(id);
  }
}
