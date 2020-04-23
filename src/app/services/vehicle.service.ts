import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Subject, Observable } from "rxjs";
import { Vehicle } from "../models/vehicle.model";
import { TokenStorageService } from "./tokenStorage.service";
import { VehicleType } from "../models/vehicleType.model";


const ADMIN_API = 'http://localhost:8080/api/vehicles/';


const getHttpOptions = (token: String) => {
    return {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })
    }
}

@Injectable()
export class VehicleService {
    vehicleChange = new Subject<Vehicle[]>();
    vehicleEditChange = new Subject<Vehicle>();

    constructor(private http: HttpClient,
        private tokenStorageService: TokenStorageService) {
    }

    onAddVehicleService(vehicleForm): Observable<any> {
        const localHttpOptions = getHttpOptions(this.tokenStorageService.getToken());
        return this.http.post(ADMIN_API + "createVehicle", {
            vehicleName: vehicleForm.value.vehicleName,
            plateNo: vehicleForm.value.plateNo,
            amount: vehicleForm.value.amount,
            quantity: vehicleForm.value.quantity,
            description: vehicleForm.value.description,
            imageUrl: vehicleForm.value.imageUrl,
            vehicleType: vehicleForm.value.vehicleType,
        }, localHttpOptions);
    }

    onGetAllVehicleService(): Observable<any> {
        const localHttpOptions = getHttpOptions(this.tokenStorageService.getToken());
        console.log("localHttpOptions: "+localHttpOptions);
        return this.http.get(ADMIN_API + "all", localHttpOptions);
    }

    onGetVehicleById(id): Observable<any> {
        const localHttpOptions = getHttpOptions(this.tokenStorageService.getToken());
        return this.http.get<any>(ADMIN_API + "all/" + id, localHttpOptions);

    }
    onUpdateVehicleService(vehicleForm, id): Observable<any> {
        const localHttpOptions = getHttpOptions(this.tokenStorageService.getToken());
        return this.http.put(ADMIN_API + "update/" + id, {
            vehicleName: vehicleForm.value.vehicleName,
            plateNo: vehicleForm.value.plateNo,
            amount: vehicleForm.value.amount,
            quantity: vehicleForm.value.quantity,
            description: vehicleForm.value.description,
            vehicleType: vehicleForm.value.vehicleType,
            imageUrl: vehicleForm.value.imageUrl
        }, localHttpOptions);
    }

    onDeleteVehicleService(id) {
        const localHttpOptions = getHttpOptions(this.tokenStorageService.getToken());
        return this.http.delete(ADMIN_API + "delete/" + id, localHttpOptions);
    }
   
}
