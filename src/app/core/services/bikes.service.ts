import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Bike} from '../models/bike.model';

class Bikes {
}

@Injectable({
  providedIn: 'root'
})
export class BikesService {

  mockUrl = 'assets/mockBikes.json';

  constructor(private http: HttpClient, @Inject('API_URL') private baseUrl: string) { }

  $bikes = this.http.get<Bike[]>(this.mockUrl)
    .pipe(
      tap(data => console.log('bikes', data)),
      catchError(this.handleError)
    );

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
