import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { Equipment } from "../models/equipment.model";
import { TokenStorageService } from "./tokenStorage.service";

const ADMIN_API = 'http://localhost:8080/api/equipment/';

const TOKEN = localStorage.getItem('auth_user');

const getHttpOptions = (token: String) => {
  return {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
  }
}

@Injectable()
export class EquipmentService {
  equipmentChange = new Subject<Equipment[]>();

  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService) {
  }

  onAddEquipmentService(equipmentForm): Observable<any> {
    const localHttpOptions = getHttpOptions(this.tokenStorageService.getToken());
    console.log(localHttpOptions);
    return this.http.post(ADMIN_API + "createEquipment", {
      equipmentName: equipmentForm.value.equipmentName,
      amount: equipmentForm.value.amount,
      imageUrl: equipmentForm.value.imageUrl,
      description: equipmentForm.value.description
    }, localHttpOptions);
  }

  onGetAllEquipmentService(): Observable<any> {
    const localHttpOptions = getHttpOptions(this.tokenStorageService.getToken());
    return this.http.get(ADMIN_API + "all", localHttpOptions);
  }

  onGetEquipmentById(id: number): Observable<any> {
    const localHttpOptions = getHttpOptions(this.tokenStorageService.getToken());
    return this.http.get<any>(ADMIN_API + "all/" + id, localHttpOptions);

  }
  onUpdateEquipmentService(equipmentForm, id): Observable<any> {
    const localHttpOptions = getHttpOptions(this.tokenStorageService.getToken());
    return this.http.put(ADMIN_API + "update/" + id, {
      equipmentName: equipmentForm.value.equipmentName,
      amount: equipmentForm.value.amount,
      imageUrl: equipmentForm.value.imageUrl,
      description: equipmentForm.value.description
    }, localHttpOptions);
  }

  onDeleteEquipmentService(id: number) {
    const localHttpOptions = getHttpOptions(this.tokenStorageService.getToken());
    return this.http.delete(ADMIN_API + "delete/" + id, localHttpOptions);
  }
}