import { HttpHeaders, HttpClient } from "@angular/common/http"; import { Injectable } from "@angular/core"; import { TokenStorageService } from "./tokenStorage.service"; import { ActivatedRoute } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { Rent } from "../models/rent.model";


const AUTH_API = 'http://localhost:8080/api/rent/';

const getHttpOptions = (token: String) => {
  return {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
  }
}

@Injectable()
export class RentService {

  userId;
  rentTimeChanged = new Subject<Rent>();
  rentListChange = new Subject<Rent[]>();
  cancelRent = new Subject<Rent>();

  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private activatedRoute: ActivatedRoute) {

  }

  onCreateRentService(id, rentFormData): Observable<any> {
    const localHttpOptions = getHttpOptions(this.tokenStorageService.getToken());
    console.log(localHttpOptions);
    console.log(id);
    console.log(rentFormData);
    return this.http.post(AUTH_API + "createRent/" + id, {
      dateTimeFrom: rentFormData.value.dateFrom,
      dateTimeTo: rentFormData.value.dateTo,
      list: rentFormData.value.selectedEquipments,
      drivingLicenceImagefile: rentFormData.value.drivingLicenceImagefile,
      utilityBillImagefile: rentFormData.value.utilityBillImagefile
    }, localHttpOptions);
  }

  onGetAllRents() {
    const localHttpOptions = getHttpOptions(this.tokenStorageService.getToken());
    console.log(localHttpOptions);
    const user = this.tokenStorageService.getUser();
    this.userId = user.id;
    return this.http.get(AUTH_API + "all/user/" + this.userId, localHttpOptions);
  }

  onGetRent(id) {
    const localHttpOptions = getHttpOptions(this.tokenStorageService.getToken());
    return this.http.get(AUTH_API + "all/rent/" + id, localHttpOptions);
  }

  onExtendRentById(id, rentId) {
    const localHttpOptions = getHttpOptions(this.tokenStorageService.getToken());
    return this.http.put(AUTH_API + "extendRent/" + id, {}, localHttpOptions);
  }

  onTakenRentById(rentId, rent) {
    const localHttpOptions = getHttpOptions(this.tokenStorageService.getToken());
    return this.http.put(AUTH_API + "rentIsTaken/" + rentId,{}, localHttpOptions);
  }
  ongetAllNotBlacklistUsersRent() {
    const localHttpOptions = getHttpOptions(this.tokenStorageService.getToken());
    return this.http.get(AUTH_API + "allNotBlacklist", localHttpOptions);
  }
  onCancelRentByRentId(rentId) {
    const localHttpOptions = getHttpOptions(this.tokenStorageService.getToken());
    return this.http.put(AUTH_API + "cancelRent/" + rentId, localHttpOptions);
  }
  onBlackListUser(rentId,rent){
    const localHttpOptions = getHttpOptions(this.tokenStorageService.getToken());
    return this.http.put(AUTH_API + "blacklistUser/" + rentId, rent,localHttpOptions);
  }

  ongetAllBlacklistUsersRent() {
    const localHttpOptions = getHttpOptions(this.tokenStorageService.getToken());
    return this.http.get(AUTH_API + "allBlacklist", localHttpOptions);
  }
}