import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RentService } from 'src/app/services/rent.service';
import { Rent } from 'src/app/models/rent.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-rent',
  templateUrl: './customer-rent.component.html',
  styleUrls: ['./customer-rent.component.css']
})
export class CustomerRentComponent implements OnInit {
  rentList;
  equipmentList: String[] = [];
  currentDate = new Date();
  newDate: Date;

  constructor(private rentService: RentService) { }

  ngOnInit() {
    console.log("hii")
    this.rentService.onGetAllRents().subscribe(data => {
      this.rentList = data;
      console.log(data);
    });
    this.rentService.rentTimeChanged.subscribe(() => {
      this.rentService.onGetAllRents().subscribe(data => {
        this.rentList = data;
        console.log(data);
      });
    });
  }

  greaterThan(current, to) {
    this.newDate = new Date(to)
    return current > this.newDate;
  }
  rent;
  message: string;
  isError: boolean;
  isDisabled=false;
  disablebutton = [false, false]

  @ViewChild('mybutton(i)') button:ElementRef;
  onExtend(index,rentId) {
    this.rentService.onGetRent(rentId).subscribe(rent => {
      this.rent = rent;
      this.rentService.onExtendRentById(rentId, this.rent).subscribe(data => {
        this.rentService.rentTimeChanged.next(this.rent);
        this.message = "Booking successfully extended";
        this.isError = false;
        this.disablebutton[index] = true;

      },
        err => {
          this.disablebutton[index] = false;

          this.isDisabled = false;
          this.isError = true;
          this.message = "Extend booking did not perform. Please try again later!!!";
        });
    });

  }
  addtomainrecord(index) {
    this.disablebutton[index] = true;
    //rest of the code follows
  }
}
