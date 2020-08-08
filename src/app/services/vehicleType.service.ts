import { HttpHeaders, HttpClient } from "@angular/common/http";

import { Injectable } from "@angular/core";
import { TokenStorageService } from "./tokenStorage.service";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { Subject } from 'rxjs';
import { VehicleType } from "../models/vehicleType.model";

const ADMIN_API = 'http://localhost:8080/api/vehicleTypes/';

const getHttpOptions = (token: String) => {
  return {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
  }
}

@Injectable()
export class VehicleTypeService {
  edit = new Subject<VehicleType>();
  update = new Subject<any>();
  add = new Subject<VehicleType>();
  userToken;

  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private activatedRoute: ActivatedRoute) {

  }

  onAddVehicleTypeService(vehicleTypeForm): Observable<any> {
    const localHttpOptions = getHttpOptions(this.tokenStorageService.getToken());
    console.log('[LOCALHTTPOPTIONS]', localHttpOptions);
    return this.http.post(ADMIN_API + "createVehicleType", {
      name: vehicleTypeForm.value.name
    }, localHttpOptions);
  }

  onGetAllVehicleTypes(): Observable<any> {
    const localHttpOptions = getHttpOptions(this.tokenStorageService.getToken());
    return this.http.get(ADMIN_API + "all", localHttpOptions);
  }

  onUpdateVehicleTypseService(vehicleTypeForm, id): Observable<any> {
    const localHttpOptions = getHttpOptions(this.tokenStorageService.getToken());
    return this.http.put(ADMIN_API + "update/" + id, {
      name: vehicleTypeForm.value.name
    }, localHttpOptions);
  }
}