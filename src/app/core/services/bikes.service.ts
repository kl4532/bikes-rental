import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Bike} from '../models/bike.model';
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class BikesService {

  mockUrl = 'assets/mockBikes.json';
  url = `${this.baseUrl}/bikes`;
  searchForm: any;

  constructor(private http: HttpClient,
              private sanitizer: DomSanitizer,
              @Inject('API_URL') private baseUrl: string) { }

  bikes$ = this.http.get<any>(this.url)
    .pipe(
      map(data => {
        for (const bike of data) {
          console.log('bike', bike);
          if (bike.picture) {
            const imgUrl = 'data:image/png;base64,' + bike.picture;
            bike.picture = this.sanitizer.bypassSecurityTrustUrl(imgUrl);
          }
        }

        return data;
      }),
      catchError(this.handleError)
    );

  getFilteredBikes(form: any): Observable<Bike[]> {
    return this.bikes$
      .pipe(
        map(bikes => bikes.filter((bike: Bike) => {
          // check if selected dates overlaps with already booked
          if (bike.bookedDates) {
            // date selected in form start/end
            const fs = new Date(form.dateStart).getTime();
            const fe = new Date(form.dateEnd).getTime();

            for (const booked of bike.bookedDates) {
              // date already booked start/end
              const bs = new Date(booked.dateStart).getTime();
              const be = new Date(booked.dateEnd).getTime();

              if (bs <= fs && fs <= be || bs <= fe && fe <= be) {
                return false;
              }
            }
          }
          // filter for bike type and max price
          return form.bikeTypes.includes(bike.type) && form.maxPrice >= bike.price;
        })),
        catchError(this.handleError)
      );

  }

  getBikeDetails(id: number): Observable<Bike> {
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

  createBike(bikeForm: any): any{
    const flattenGear = [];
    for (const el of bikeForm.gear) {
      flattenGear.push(el.name);
    }
    bikeForm.gear = flattenGear;

    const formData: FormData = new FormData();
    // bikeForm.picture[0] === undefined ? bikeForm.picture[0] = null : 0;
    formData.append('picture', bikeForm.picture[0]);

    console.log('bike to sent', formData);

    formData.append('bike', new Blob([JSON.stringify(
{
        name: bikeForm.name,
        description: bikeForm.description,
        price: bikeForm.price,
        gear: bikeForm.gear,
        size: bikeForm.size,
        status: bikeForm.status,
        type: bikeForm.type
      }
      )], {
      type: 'application/json'
    }));

    return this.http.post(this.url, formData, ).subscribe(
      data => console.log(data),
      err => console.log(err),
      () => console.log('Sent successfully')
    );
  }
}
