import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { Equipment } from "../models/equipment.model";
import { TokenStorageService } from "./tokenStorage.service";
import { BlackList } from "../models/blackList.model";

const ADMIN_API = 'http://localhost:8080/api/blacklist/';

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
export class BlackListService {
    blackListChange = new Subject<BlackList[]>();

    constructor(private http: HttpClient,
        private tokenStorageService: TokenStorageService) {
    }

    onAddBlackList(rentId): Observable<any> {
        const localHttpOptions = getHttpOptions(this.tokenStorageService.getToken());
        return this.http.post(ADMIN_API + "addBlackList/" + rentId, localHttpOptions);
    }
}