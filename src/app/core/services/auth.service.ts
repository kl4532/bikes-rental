import { Injectable } from '@angular/core';

import {BehaviorSubject, Observable, of} from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // isUserLoggedIn = false;
  isAdminLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  loginUser(userName: string, password: string): any {
    console.log(userName);
    console.log(password);
    // authenticate against user table in backend
    const isLogged = userName === 'user' && password === 'user';
    this.isUserLoggedIn.next(isLogged);
    localStorage.setItem('isUserLoggedIn', isLogged ? "true" : "false");

    return of(isLogged).pipe(
      delay(1000),
      tap(val => {
        console.log("User Authentication is successful: " + val);
      })
    );
  }

  loginAdmin(name: string, password: string): Observable<any> {
    // authenticate against admin table in backend
    const isLogged = name === 'admin' && password === 'admin';
    this.isAdminLoggedIn.next(isLogged);

    return of(isLogged).pipe(
      delay(1000),
      tap(val => {
        console.log("Admin Authentication is successful: " + val);
      })
    );
  }

  logout(): void {
    this.isUserLoggedIn.next(false);
    localStorage.removeItem('isUserLoggedIn');
  }

  constructor() { }
}
