import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/services/tokenStorage.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isSubmitted = false;
  userLoggedIn = false;
  message;
  id;
  name;
  nic;
  dob;
  email;
  mobileNo;
  drivingLicence;
  username;
  passwords;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.userLoggedIn = !!this.tokenStorageService.getToken(); //checking if the token is not null
    if (this.userLoggedIn) { // if it is true

      const user = this.tokenStorageService.getUser();
      this.id = user.id;
      this.userService.onGetUserById(this.id).subscribe((data: User) => {
        console.log(data);
        this.name = data.name;
        this.nic = data.nic;
        this.dob = data.dob;
        this.email = data.email;
        this.mobileNo = data.mobileNo;
        this.drivingLicence = data.drivingLicence;
        this.username = data.username;
      });
    }
    this.userService.userChanged.subscribe(id=>{
      this.userService.onGetUserById(id).subscribe((data: User) => {
        console.log(data);
        this.name = data.name;
        this.nic = data.nic;
        this.dob = data.dob;
        this.email = data.email;
        this.mobileNo = data.mobileNo;
        this.drivingLicence = data.drivingLicence;
        this.username = data.username;
      });
  });
}

  onForgot() {
    this.router.navigate(['forgotPassword'], { relativeTo: this.activatedRoute });

  }
  onEdit(){
    this.router.navigate(['edit'],{relativeTo:this.activatedRoute});
  }

  onResetPassword(){
    this.router.navigate(['reset-password'],{relativeTo:this.activatedRoute});
  }
}
