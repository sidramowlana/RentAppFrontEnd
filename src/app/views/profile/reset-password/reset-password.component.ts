import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private userService: UserService) { }

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
    // this.userService.onResetPasswordService(this.resetPasswordForm.get('password').value).subscribe(data => {
    //   console.log(data);
    // });
  }
}
