import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenStorageService } from "./tokenStorage.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";

const ADMIN_INSURENCE_INTEGRATION_API = 'http://localhost:8080/api/insurer/';

const getHttpOptions = (token: String) => {
    return {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })
    }
}

@Injectable()
export class InsurerService{
    constructor(private http: HttpClient,
        private tokenStorageService: TokenStorageService) {
    }

    onGetFraudLicenseService(): Observable<any> {
        const localHttpOptions = getHttpOptions(this.tokenStorageService.getToken());
        return this.http.get(ADMIN_INSURENCE_INTEGRATION_API + "insurer-licence", localHttpOptions);
      }
    }