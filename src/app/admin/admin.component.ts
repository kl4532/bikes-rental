import { Component, OnInit } from '@angular/core';
import {AuthService} from "../core/services/auth.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  isAdminLoggedIn = true;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // this.authService.isAdminLoggedIn.subscribe(isAdmin => this.isAdminLoggedIn = isAdmin);
  }

}
