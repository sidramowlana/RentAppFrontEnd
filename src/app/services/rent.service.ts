import { HttpHeaders, HttpClient } from "@angular/common/http";import { Injectable } from "@angular/core";import { TokenStorageService } from "./tokenStorage.service";import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";


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
  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private activatedRoute: ActivatedRoute) {

  }

  onCreateRentService(id, rentFormData):Observable<any> {   
    const localHttpOptions = getHttpOptions(this.tokenStorageService.getToken());
    console.log('[LOCALHTTPOPTIONS]', localHttpOptions);
    return this.http.post(AUTH_API + "createRent/"+ id,{
      dateTimeFrom: rentFormData.value.dateFrom,
      dateTimeTo: rentFormData.value.dateTo,
      list: rentFormData.value.selectedEquipments,
      drivingLicenceImagefile: rentFormData.value.drivingLicenceImagefile,
      utilityBillImagefile: rentFormData.value.utilityBillImagefile
    }, localHttpOptions);
  }

  onGetAllRents(){
    const localHttpOptions = getHttpOptions(this.tokenStorageService.getToken());
    const user = this.tokenStorageService.getUser();
    this.userId = user.id;
    console.log(this.userId)
    console.log('[LOCALHTTPOPTIONS]', localHttpOptions);
    return this.http.get(AUTH_API + "all/"+ this.userId,localHttpOptions);    
  }
   
  onExtendRent(rentId){
     const localHttpOptions = getHttpOptions(this.tokenStorageService.getToken());   
     console.log('[LOCALHTTPOPTIONS]', localHttpOptions);
    return this.http.put(AUTH_API + "extendRent/"+ rentId,localHttpOptions);    
  }
}