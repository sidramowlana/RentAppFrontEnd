import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/services/tokenStorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  isLoggedIn:boolean=false;
  isLoginFailed:boolean= false;

  errorMessage:String;
  constructor(private authenticationService:AuthenticationService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private tokenStorageService:TokenStorageService) { }

  ngOnInit() {
    this.initForm();
  }
  private initForm() {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });
  }
  onLogin(){
this.authenticationService.onLoginService(this.loginForm).subscribe(data=>{
  this.tokenStorageService.saveToken(data.token);
  this.tokenStorageService.saveUser(data);
  this.isLoginFailed = false;
      this.isLoggedIn = true; 
        this.router.navigateByUrl('/login', { skipLocationChange: false }).then(() => {   
    this.router.navigate(['/home']);
  });
},
  err => {
    console.log(err);
    this.errorMessage = err.error.message;
    this.isLoginFailed = true;
  });
  }
}
