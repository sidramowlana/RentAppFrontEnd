import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenStorageService } from './services/tokenStorage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  resetPassword: boolean = false;
  rp;
  url: String;
  helper = new JwtHelperService();

  constructor(private tokenStorageService: TokenStorageService,
    private router: Router) { }


  ngOnInit() {}
}
//     if (this.tokenStorageService.getToken() != null) {
//       this.tokenStorageService.signOut();
//       this.router.navigate(["login"]);
//     }
//     this.url = window.location.href;
//     this.rp = "/resetPassword";
//     if (this.url.includes(this.rp)) {
//       console.log(window.location.href);
//       this.resetPassword = true;
//     }
//     else {
//       // console.log(window.location.href);
//       this.resetPassword = false;
//     }

//   }
//   time: Date;

//   expireTime: any;
//   reducetime: any;
//   onChanges() {

//   }

//   // get the token expire time
//   // reduce the expire time
//   //
//   ngDoCheck() {
//     setTimeout(() => {
//       this.time = new Date();
//       let t = this.tokenStorageService.getToken();
//       if (t != null) {
//         this.expireTime = this.helper.decodeToken(t).exp;
//         if (this.reducetime && ((Date.now() / 1000) > this.reducetime)) {
//           console.log("worked");
//           this.tokenStorageService.signOut();
//           this.router.navigate(["/login"]);
//         }
//       }
//     }, 0);

//   }
// }
