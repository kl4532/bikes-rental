import { Injectable } from '@angular/core';

import {BehaviorSubject, of} from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // isUserLoggedIn = false;
  isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  login(userName: string, password: string): any {
    console.log(userName);
    console.log(password);
    const isLogged = userName === 'admin' && password === 'admin';
    this.isUserLoggedIn.next(isLogged);
    localStorage.setItem('isUserLoggedIn', isLogged ? "true" : "false");

    return of(isLogged).pipe(
      delay(1000),
      tap(val => {
        console.log("User Authentication is successful: " + val);
      })
    );
  }

  logout(): void {
    this.isUserLoggedIn.next(false);
    localStorage.removeItem('isUserLoggedIn');
  }

  constructor() { }
}
