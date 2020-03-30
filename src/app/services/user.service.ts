import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenStorageService } from "./tokenStorage.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { User } from "../models/user.model";
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
  userChanged = new Subject<User>();

  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private activatedRoute: ActivatedRoute) { }

  onSendEmailService(personalEmail) {
    return this.http.post(AUTH_API + "forgotPassword", personalEmail);
  }

  onResetPasswordService(newPassword) {
    const localHttpOptions = getHttpOptions(this.tokenStorageService.getToken());
   const userNameToken = this.tokenStorageService.getUser();
    console.log(userNameToken.token);
    return this.http.put<String>(AUTH_API + "updatePassword/" + userNameToken.token, newPassword,localHttpOptions);
  }
  onGetUserById(id) {
    const localHttpOptions = getHttpOptions(this.tokenStorageService.getToken());
    return this.http.get<any>(AUTH_API + "all/" + id, localHttpOptions);
  }
  onUpdateProfileById(updateProfileForm,id){
    console.log(id);
    console.log(updateProfileForm);
    const localHttpOptions = getHttpOptions(this.tokenStorageService.getToken());
    return this.http.put<any>(AUTH_API + "updateUser/" + id,  {
      name: updateProfileForm.value.name,
      nic: updateProfileForm.value.nic,
      dob: updateProfileForm.value.dob,
      email: updateProfileForm.value.email,        
      mobileNo: updateProfileForm.value.mobileNo,
      drivingLicence: updateProfileForm.value.drivingLicence,
      username : updateProfileForm.value.username
        }, localHttpOptions);
  }
}
