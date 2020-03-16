import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errorMessage: String;
  isSubmitted: boolean = false;
  isFailed:boolean = false;      

  constructor(private authenticationService:AuthenticationService,
    private router:Router,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.initialForm();
  }

  private initialForm() {
    this.registerForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'nic': new FormControl(null, Validators.required),
      'dob': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'mobileNo': new FormControl(null, Validators.required),
      'drivingLicence': new FormControl(null, Validators.required),
      'username': new FormControl(null, Validators.required),
      'passwords': new FormGroup({
        'password': new FormControl(null, Validators.required),
        'reEnterPassword': new FormControl(null, Validators.required)
      }, this.checkPassword.bind(this))
    });
  }
  onRegister() {
    this.authenticationService.onRegisterService(this.registerForm).subscribe(data=>{
      console.log(data);
      this.isSubmitted = true;
      this.isFailed = true;      
      this.router.navigate(['/login'], {relativeTo:this.activatedRoute});

    },
    err => {
      this.errorMessage = err.error.message;
      this.isSubmitted = false;
      this.isFailed = true;      
    });

  }

  checkPassword(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('reEnterPassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }
}