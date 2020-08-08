import { Component, OnInit, ɵConsole, ViewChild, ElementRef } from '@angular/core';
import { RentService } from 'src/app/services/rent.service';
import { Rent } from 'src/app/models/rent.model';
import { DatePipe } from '@angular/common';
import { BlackListService } from 'src/app/services/blackList.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-all-rent',
  templateUrl: './view-all-rent.component.html',
  styleUrls: ['./view-all-rent.component.css'],
  providers: [DatePipe]

})
export class ViewAllRentComponent implements OnInit {
  allRentList;
  rent;
  currentDate = new Date();
  datepipeToTime: string;
  datepipeCurrent: String;
  isTime: boolean;
  message: String;
  list;
  aRent;
  cancelledRent;
  vehicleIsRented;

  isDisabled = false;
  disablebutton = [false, false];
  disablebuttons = [false, false];

  constructor(private rentService: RentService,
    private datePipe: DatePipe, private toastr: ToastrService) { }

  ngOnInit() {
    this.rentService.ongetAllNotBlacklistUsersRent().subscribe(data => {
      this.allRentList = data;
      for (let r of this.allRentList) {
        this.vehicleIsRented = r.vehicleIsRented;
      }
    });
    this.rentService.rentListChange.subscribe(updateData => {
      this.allRentList = updateData;
    });
    this.rentService.cancelRent.subscribe(()=>{
      this.rentService.ongetAllNotBlacklistUsersRent().subscribe(data=>{
        this.allRentList = data;
        for (let r of this.allRentList) {
          this.vehicleIsRented = r.vehicleIsRented;
        }
    });
  })
}

  onFail(index, rentId, dateTimeFrom) {
    this.datepipeCurrent = this.datePipe.transform(this.currentDate, 'MM/dd/yyyy, h:mm a');
    if (dateTimeFrom == this.datepipeCurrent) {
      this.rentService.onGetRent(rentId).subscribe(rent => {
        this.rent = rent;
        this.rentService.onBlackListUser(rentId, rent).subscribe(data => {
          this.rentService.ongetAllNotBlacklistUsersRent().subscribe(data => {
            this.list = data;
            this.rentService.rentListChange.next(this.list)
            this.toastr.info("User is added to the black lists");
            this.disablebutton[index] = true;
          });
        });
      });
    }
    else {
      this.toastr.info("User has time to collect");
    }
  }
  @ViewChild('mybutton(i)') button: ElementRef;
  onCancelBooking(index, rentId) {
    this.rentService.onCancelRentByRentId(rentId).subscribe((data: Rent) => {
      this.cancelledRent = data;
      this.vehicleIsRented = this.cancelledRent.vehicleIsRented;
      this.toastr.success("Cancelled the appointment and notified user");
      this.disablebuttons[index] = false;
      this.rentService.cancelRent.next(this.cancelledRent);
      this.isDisabled=true
    },

  err => {
    this.disablebuttons[index] = false;
  });
  }

  onTaken(index, rentId, toTime) {
    this.rentService.onGetRent(rentId).subscribe(rent => {
      this.rent = rent;
      this.datepipeCurrent = this.datePipe.transform(this.currentDate, 'MM/dd/yyyy, h:mm a');
      this.datepipeToTime = this.datePipe.transform(toTime, 'MM/dd/yyyy, h:mm a');
      if (this.datepipeToTime !== this.datepipeCurrent) {
        this.isTime = false;
        this.toastr.info("The customer have his time to collect the rented vehicle");
      }
      else {
        this.isTime = true;
        this.toastr.success("User have collected it successfully");
        this.rentService.onTakenRentById(rentId, this.rent).subscribe(data => {
        });
      }
    });
  }
  addtomainrecord(index) {
    this.disablebutton[index] = true;
  }
}
