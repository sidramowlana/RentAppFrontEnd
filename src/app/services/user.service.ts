import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenStorageService } from "./tokenStorage.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";

const AUTH_API = 'http://localhost:8080/api/users/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const getHttpOptions = (token: String) => {
  return {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
  }
}

@Injectable()
export class UserService {
  users;
  userId;
  userNameToken;
  // userChanged = new Subject<User[]>();

  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private activatedRoute: ActivatedRoute) { }

  onSendEmailService(personalEmail) {
    return this.http.post(AUTH_API + "forgotPassword", personalEmail);
  }

  onResetPasswordService(newPassword) {
    this.userNameToken = this.activatedRoute.snapshot.queryParams['token'];
    return this.http.put<String>(AUTH_API + "updatePassword/" + this.userNameToken, newPassword);
  }
  onGetUserById(id) {
    const localHttpOptions = getHttpOptions(this.tokenStorageService.getToken());
    return this.http.get<any>(AUTH_API + "all/" + id, localHttpOptions);
  }
  onUpdateProfileById(id){
    const localHttpOptions = getHttpOptions(this.tokenStorageService.getToken());
    return this.http.get<any>(AUTH_API + "all/" + id, localHttpOptions);
  }
}