import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  updateProfileForm: FormGroup;
  isSubmitted=false;
  message;
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService:UserService) { }

  ngOnInit() {
    this.updateProfileForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'nic': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'drivingLicenceNo': new FormControl(null, Validators.required),
      'username': new FormControl(null, Validators.required),
        'password': new FormControl(null, Validators.required),
    });
  }

}
