import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {AuthService} from "../../../core/services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss']
})
export class LayoutHeaderComponent implements OnInit, OnDestroy {

  isAdmin = false;
  logged = false;
  subAdmin: Subscription | undefined;
  subUser: Subscription | undefined;


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.subUser = this.authService.isUserLoggedIn.subscribe(logged => this.logged = logged);
    this.subAdmin = this.authService.isAdminLoggedIn.subscribe(isAdmin => this.isAdmin = isAdmin);
  }

  logOut(): void {
    this.authService.logout(this.isAdmin);
  }

  ngOnDestroy(): void {
    this.subAdmin?.unsubscribe();
    this.subUser?.unsubscribe();
  }

}
