import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenStorageService } from './services/tokenStorage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  resetPassword: boolean = false;
  rp;
  url: String;
  helper = new JwtHelperService();
  time: Date;

  expireTime: any;
  reducetime: any;

  constructor(private tokenStorageService: TokenStorageService,
    private router: Router) { }


  ngOnInit() {
    // if (this.tokenStorageService.getToken() != null) {
    //   this.tokenStorageService.signOut();
    //   this.router.navigate(["login"]);
    // }
    this.url = window.location.href;
    this.rp = "/resetPassword";
    if (this.url.includes(this.rp)) {
      // console.log(window.location.href);
      this.resetPassword = true;
    }
    else {
      // console.log(window.location.href);
      this.resetPassword = false;
    }

  }

  ngDoCheck() {
    if (this.tokenStorageService.getToken() != null) {
      if (this.helper.isTokenExpired(this.tokenStorageService.getToken())) {
        this.tokenStorageService.signOut();
        this.router.navigate(['/login']);
      } else {
        console.log("token can be still used");
      }
    }
  }
}
