import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  isSubmitted:boolean;
  message;
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService:UserService,private toastr:ToastrService) { }

  ngOnInit() {
    console.log("startinghrere");
    this.forgotPasswordForm = new FormGroup({
      'email': new FormControl(null, Validators.required),
    });
  }

  onSendEmail(){
    this.userService.onSendEmailService(this.forgotPasswordForm.value.email)
    .subscribe(data=>{
      this.forgotPasswordForm.reset();
      this.toastr.success("Email has been sent successfully!");
        },
    err=>{
      this.toastr.error("There is an error on sending the mail. Please try again with a working email");
    });
  }
  onClose()
  {
    this.router.navigate(['/login']);
  }
}
