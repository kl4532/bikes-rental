import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../core/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginForm: any;
  loginFailed = false;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),

    });
  }
  onLogin(): void {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.authService.login(email, password)
      .subscribe( (loggedIn: any) => {
        console.log('Is Login Success: ' + loggedIn);
        if (loggedIn) {
          this.router.navigate(['']);
          this.loginFailed = false;
        } else {
          this.loginFailed = true;
        }
      });
  }
}
