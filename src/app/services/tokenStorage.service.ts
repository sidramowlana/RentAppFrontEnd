import { Injectable } from '@angular/core';
import { HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';


const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

@Injectable()
export class TokenStorageService {

  constructor(private router:Router) { }

  signOut() { window.sessionStorage.clear();
  this.router.navigate(["/"]); }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user){
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public getUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }
}