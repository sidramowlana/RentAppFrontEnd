import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/services/tokenStorage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user;
  roles;
  constructor(private authenticationService: AuthenticationService,
    private router: Router,private toastr:ToastrService,
    private activatedRoute: ActivatedRoute,
    private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.initForm();
  }
  private initForm() {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });
  }
  onLogin() {
    // window.location.reload();
    this.authenticationService.onLoginService(this.loginForm).subscribe(data => {
      this.tokenStorageService.saveToken(data.token);
      this.tokenStorageService.saveUser(data);
      this.user = this.tokenStorageService.getUser();
     
      this.roles = this.user.roles;
      if (this.roles.includes("ROLE_ADMIN")) {
        this.toastr.success("Successfully Logged in as Admin");
        this.router.navigate(['/adminHome']);

      }else{
        this.toastr.success("Successfully Logged in");
        this.router.navigate(['/home']);
      }
    },
      err => {
        this.toastr.error("Login credentials invalid","please try again");
      });

  }
  onForgotPassword(){
    this.router.navigate(['forgotPassword']);
    // ,{relativeTo:this.activatedRoute});
  }
}
