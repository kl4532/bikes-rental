import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../core/services/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  loginForm: any;
  loginFailed = false;
  @Input() adminAuth = false;
  sub: Subscription | undefined;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),

    });
  }
  onLogin(): void {
    const name = this.loginForm.value.name;
    const password = this.loginForm.value.password;

    if (this.adminAuth) {
      this.sub = this.authService.loginAdmin(name, password).subscribe((loggedIn: any) => {
        this.loginFailed = !loggedIn;
        this.authService.isAdminLoggedIn.next(loggedIn);
      });
    } else {
      this.sub = this.authService.loginUser(name, password).subscribe( (loggedIn: any) => {
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

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
