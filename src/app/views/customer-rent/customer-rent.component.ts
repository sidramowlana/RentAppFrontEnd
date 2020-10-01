import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RentService } from 'src/app/services/rent.service';
import { Rent } from 'src/app/models/rent.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/app/services/tokenStorage.service';
import { UserService } from 'src/app/services/user.service';

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
  user;
  vehicleIsRented;

  constructor(private rentService: RentService,private tokenStorageService:TokenStorageService,private toastr:ToastrService,private userService:UserService) { }

  ngOnInit() {
    this.userService.onGetUserById(this.tokenStorageService.getUser().id).subscribe(data=>
      {
        this.user=data;
      })
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

  onExtend(rentId) {
        this.rentService.onUpdateStatusRentId(rentId, "Extended").subscribe(data => {
          this.rent=data;
        this.rentService.rentTimeChanged.next(this.rent);
        this.toastr.success("Booking successfully extended");
      },
        err => {
          this.toastr.error("Vehicle will not available for extension");
        });
  }

  // onExtend(rentId) {
  //   this.rentService.onGetRent(rentId).subscribe(rent => {
  //     this.rent = rent;
  //     this.rentService.onExtendRentById(rentId, this.rent).subscribe(data => {
  //       this.rentService.rentTimeChanged.next(this.rent);
  //       this.toastr.success("Booking successfully extended");
  //     },
  //       err => {
  //         this.toastr.error("Vehicle will not available for extension");
  //       });
  //   });

  // }
}
