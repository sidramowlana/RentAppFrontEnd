import { AuthenticationService } from "./authentication.service";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuardService implements CanActivate {
    authenticated = false;
    roles: String[];

    constructor(private authService: AuthenticationService,
        private router: Router,
        private activatedRoute: ActivatedRoute) { }

    canActivate(activateRotuerSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.authService.isAuthenticated()) {
            return true;
        }
        else {
            this.router.navigate(['/home']);
            return false;
        }
    }
}