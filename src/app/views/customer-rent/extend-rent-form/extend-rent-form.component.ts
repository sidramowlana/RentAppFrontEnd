import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RentService } from 'src/app/services/rent.service';

@Component({
  selector: 'app-extend-rent-form',
  templateUrl: './extend-rent-form.component.html',
  styleUrls: ['./extend-rent-form.component.css']
})
export class ExtendRentFormComponent implements OnInit {
  extendRentFrom: FormGroup;
  @Input() rentId: number;
  constructor(private rentService:RentService) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.extendRentFrom = new FormGroup({
      'rentTime': new FormControl(null, Validators.required)
    });
  }
  onExtend() {
    console.log("extended "+this.rentId);
    this.rentService.onExtendRent(this.rentId).subscribe(data => {
      console.log(data);
    });
  }
}
