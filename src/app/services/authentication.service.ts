import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenStorageService } from "./tokenStorage.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";

const AUTH_API = 'http://localhost:8080/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthenticationService {
  helper = new JwtHelperService();
  isRoleAdmin: boolean = false;
  isLoggedIn = false;
  roles;

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService, private router: Router, private activatedRoute: ActivatedRoute) { }

  onLoginService(credentials): Observable<any> {
    return this.http.post(AUTH_API + "login", {
      username: credentials.value.username,
      password: credentials.value.password
    },
      httpOptions);
  }

  onRegisterService(user): Observable<any> {
    return this.http.post(AUTH_API + "register", {
      name: user.value.name,
      nic: user.value.nic,
      dob: user.value.dob,
      email: user.value.email,
      mobileNo: user.value.mobileNo,
      drivingLicence: user.value.drivingLicence,
      username: user.value.username,
      password: user.value.passwords.password
    }, httpOptions);
  }

  loggedIn() {
    const token = this.tokenStorageService.getToken();
    return !this.helper.isTokenExpired(token);
  }

  isAuthenticated() {
    // console.log("is logged in: "+this.loggedIn());

    if (this.loggedIn() === true) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      if (this.roles.includes("ROLE_ADMIN")) {
        this.isRoleAdmin = true;
        return this.isRoleAdmin;
      }
      return;
    }
  }

}