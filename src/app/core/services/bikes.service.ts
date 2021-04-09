import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Bike} from '../models/bike.model';

@Injectable({
  providedIn: 'root'
})
export class BikesService {

  mockUrl = 'assets/mockBikes.json';
  searchForm: any;

  constructor(private http: HttpClient, @Inject('API_URL') private baseUrl: string) { }

  bikes$ = this.http.get<any>(this.mockUrl)
    .pipe(
      tap(data => console.log('bikes', data)),
      catchError(this.handleError)
    );

  getFilteredBikes(form: any): Observable<Bike[]> {
    return this.bikes$
      .pipe(
        // filter type and price
        map(bikes => bikes.filter((bike: Bike) => {
          return form.bikeTypes.includes(bike.type) && form.maxPrice >= bike.price;
        })),
        catchError(this.handleError)
      );

  }

  getBikeDetails(id: string): Observable<Bike> {
    return this.bikes$
      .pipe(
        map(bikes => bikes.find((bike: Bike) => bike.id === id)),
        catchError(this.handleError)
      );
  }

  setSearchForm(searchFormVal: any):void {
    this.searchForm = searchFormVal;
  }

  private handleError(err: any): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
