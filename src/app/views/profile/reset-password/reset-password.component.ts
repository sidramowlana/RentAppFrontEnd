import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/services/tokenStorage.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  urlToken: string;
  url: string;
  isSubmitted: boolean;
  message: string;
  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private userService: UserService, private authService: AuthenticationService,
    private tokenStorageService: TokenStorageService, private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.resetPasswordForm = new FormGroup({
      'password': new FormControl(null, Validators.required)
    });
  }
  onClose() {
    this.router.navigate(['./'], { relativeTo: this.activatedRoute });
  }

  onReset() {
    if (this.authService.loggedIn()) {
      this.userService.onResetPasswordService(this.resetPasswordForm.value.password)
        .subscribe(data => {
          this.resetPasswordForm.reset();
          this.toastr.success("Password Updated successfully!");
          this.tokenStorageService.signOut();          
        },
          err => {
            console.log(err);
            this.toastr.error("Please try again later", "Sorry could update password");
          });
    } else {
      this.url = this.router.url;
      this.urlToken = this.url.substring(this.url.lastIndexOf('=') + 1);
      console.log(this.url)
      this.userService.onResetPasswordWithTokenService(this.resetPasswordForm.value.password, this.urlToken)
        .subscribe(data => {
          console.log(data);
          this.isSubmitted = true;
          this.resetPasswordForm.reset();
          this.toastr.success("Password Updated successfully!");
          setTimeout(() => {
            this.router.navigate(["home"]);
          }, 1000);
          // 
        },
          err => {
            this.isSubmitted = false;
            console.log(err);
            this.toastr.error("Please try again later", "Sorry could update password");
          }
        );
    }
  }
}
