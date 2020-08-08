import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RentService } from 'src/app/services/rent.service';
import { Rent } from 'src/app/models/rent.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
  rent;
  isDisabled = false;
  disablebutton = [false, false];
  
  constructor(private rentService: RentService,private toastr:ToastrService) { }

  ngOnInit() {
    this.rentService.onGetAllRents().subscribe(data => {
      this.rentList = data;
    });
    this.rentService.rentTimeChanged.subscribe(() => {
      this.rentService.onGetAllRents().subscribe(data => {
        this.rentList = data;
      });
    });
  }

  ngAfterContentInit(){
    this.rentService.onGetAllRents().subscribe(data => {
      this.rentList = data;
    });
    this.rentService.rentTimeChanged.subscribe(() => {
      this.rentService.onGetAllRents().subscribe(data => {
        this.rentList = data;
      });
    });
  }
  greaterThan(current, to) {
    this.newDate = new Date(to)
    return current > this.newDate;
  }

  @ViewChild('mybutton(i)') button: ElementRef;
  onExtend(index, rentId) {
    this.rentService.onGetRent(rentId).subscribe(rent => {
      this.rent = rent;
      this.rentService.onExtendRentById(rentId, this.rent).subscribe(data => {
        this.rentService.rentTimeChanged.next(this.rent);
        this.toastr.success("Booking successfully extended");
        this.disablebutton[index] = true;
      },
        err => {
          this.disablebutton[index] = false;

          this.isDisabled = false;
          this.toastr.error("Extend booking did not perform. Please try again later!!!");
        });
    });

  }
  addtomainrecord(index) {
    this.disablebutton[index] = true;
  }
}
