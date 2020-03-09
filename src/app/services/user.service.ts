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
export class UserService {
    users;
    userId;
    userNameToken;
    // userChanged = new Subject<User[]>();

    constructor(private http: HttpClient,
        private tokenStorageService: TokenStorageService,
        private activatedRoute: ActivatedRoute) { }

        onSendEmail(personalEmail){
            return this.http.post('//localhost:8080/api/auth/forgot', personalEmail);
        }
}