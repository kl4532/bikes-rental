import {Inject, Injectable} from '@angular/core';

import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // isUserLoggedIn = false;
  isAdminLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient,
              @Inject('API_URL') private baseUrl: string) {
  }

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

  loginAdmin(name: string, password: string): any {
    return this.http.post(`${this.baseUrl}admins/login`, {login: name, password});
  }

  logout(isAdmin: boolean): void {
    if (isAdmin) {
      this.isAdminLoggedIn.next(false);
    } else {
      this.isUserLoggedIn.next(false);
    }
    localStorage.removeItem('isUserLoggedIn');
  }
}
