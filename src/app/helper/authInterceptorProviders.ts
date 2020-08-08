import { HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenStorageService } from "../services/tokenStorage.service";


const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
 export class AuthInterceptor implements HttpInterceptor{

  constructor(private tokenStorageService: TokenStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const token = this.tokenStorageService.getToken();
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });    
    }
    return next.handle(authReq);
  }
}

 export const AuthInterceptorProviders = [{
     provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true
 }]