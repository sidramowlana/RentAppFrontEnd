import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  isSubmitted=false;
  message;
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService:UserService,) { }

  ngOnInit() {
    this.profileForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'nic': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'drivingLicenceNo': new FormControl(null, Validators.required),
      'username': new FormControl(null, Validators.required),
        'password': new FormControl(null, Validators.required),
    });
  }

  onForgot(){
    this.router.navigate(['forgotPassword'],{relativeTo:this.activatedRoute});

  }
}
