import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss']
})
export class LayoutHeaderComponent implements OnInit {

  logged = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isUserLoggedIn.subscribe(logged => this.logged = logged);
  }

  logOut(): void {
    this.authService.logout();
    console.log('attempt to log out');
  }

}
