import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;
  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.contactForm = new FormGroup({
      'text': new FormControl(null, Validators.required)
    });
  }
  
  onSend() {
    console.log(this.contactForm)    ;
    this.userService.onContactUsSendEmail(this.contactForm).subscribe(data => {
      this.toastr.success(data.message);
      this.contactForm.reset();
    }, err => {~
      this.toastr.error("Sorry couldnt contact");

    });
  }
}
