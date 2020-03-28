import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { TokenStorageService } from 'src/app/services/tokenStorage.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  updateProfileForm: FormGroup;
  isSubmitted=false;
  message;
id;
  editMode = false;
  @Input() index:number;

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
    private userService:UserService,
    private tokenStorageService:TokenStorageService) { }

  ngOnInit() {   
    const user = this.tokenStorageService.getUser();
    this.id = user.id;
      this.userService.onGetUserById(this.id).subscribe(data => {
        console.log(data)
        this.updateProfileForm.setValue({
          name:data.name,
          nic: data.nic,
          dob: data.dob,
          email: data.email,
          mobileNo: data.mobileNo,
          drivingLicence: data.drivingLicence,
          username: data.username
        });
      });
    this.updateProfileForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'nic': new FormControl(null, Validators.required),
      'dob': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'mobileNo': new FormControl(null, Validators.required),
      'drivingLicence': new FormControl(null, Validators.required),
      'username': new FormControl(null, Validators.required),
    });
  }
  onUpdateProfile(){
    console.log("working");
    this.userService.onUpdateProfileById(this.id).subscribe(data=>{
      console.log(data)

    });
  }
onClose(){
  this.router.navigate(['./'],{relativeTo:this.activatedRoute});
}
}
