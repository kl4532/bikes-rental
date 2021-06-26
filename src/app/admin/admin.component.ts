import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../core/services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy{

  isAdminLoggedIn = false;
  sub: Subscription | undefined;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.sub = this.authService.isAdminLoggedIn.subscribe(isAdmin => this.isAdminLoggedIn = isAdmin);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
