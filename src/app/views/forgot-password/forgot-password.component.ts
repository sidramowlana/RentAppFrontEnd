import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  isSubmitted=false;
  message;
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService:UserService) { }

  ngOnInit() {
    this.forgotPasswordForm = new FormGroup({
      'email': new FormControl(null, Validators.required),
    });
  }

  onSendEmail(){
    this.userService.onSendEmail(this.forgotPasswordForm.value.email)
    .subscribe(data=>{
      console.log(data);  
      this.isSubmitted = true;
      this.forgotPasswordForm.reset();
      this.message = "Email has been sent successfully!";
    },
    err=>{
      this.isSubmitted = false;
      console.log(err);
      this.message = err.error.message;
    });
  }
}
