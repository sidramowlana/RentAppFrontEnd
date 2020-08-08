import { HttpHeaders, HttpClient } from "@angular/common/http";

import { Injectable } from "@angular/core";
import { TokenStorageService } from "./tokenStorage.service";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { Subject } from 'rxjs';
import { VehicleType } from "../models/vehicleType.model";

const ADMIN_DMV_INTEGRATION_API = 'http://localhost:8080/api/webscrape/';

const getHttpOptions = (token: String) => {
    return {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })
    }
}

@Injectable()
export class Webscraping {
    constructor(private http: HttpClient,
        private tokenStorageService: TokenStorageService) {
    }

    onGetWebScrapeDataService(): Observable<any> {
        const localHttpOptions = getHttpOptions(this.tokenStorageService.getToken());
        return this.http.get(ADMIN_DMV_INTEGRATION_API + "vehicle-data", localHttpOptions);
      }
}