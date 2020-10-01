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
  datepipedateTimeFrom: String;
  list;  

  constructor(private rentService: RentService,
    private datePipe: DatePipe, private toastr: ToastrService) { }

  ngOnInit() {
    this.getAllNotBlacklistUsersRent()
    this.rentService.rentListChange.subscribe(updateData => {
      this.allRentList = updateData;
    });
    this.rentService.cancelRent.subscribe(() => {
      this.getAllNotBlacklistUsersRent()
    });
    this.rentService.onUpdateStatus.subscribe(data => { 
      this.getAllNotBlacklistUsersRent();
      console.log(this.rent)
    });
  }
  getAllNotBlacklistUsersRent()
  { this.rentService.ongetAllNotBlacklistUsersRent().subscribe(data => {
    this.allRentList = data;   
  }); 
  }
  onTaken(rentId, fromTime) {
    let datepipeCurrent = this.datePipe.transform(this.currentDate, 'MM/dd/yyyy, h:mm a');
    let datepipedateTimeTo = this.datePipe.transform(fromTime, 'MM/dd/yyyy, h:mm a');
    let newDate = new Date(datepipeCurrent);
    let fromDate = new Date(datepipedateTimeTo);
    if (+fromDate > +newDate) {
      this.toastr.info("User has time to collect");
    }
    else {
      this.rentService.onUpdateStatusRentId(rentId, "Taken").subscribe(data => {
        this.rent = data;
        this.toastr.success("User have collected it successfully");
        this.rentService.onUpdateStatus.next(this.rent);
      });
    }
  }

  onFail(rentId, dateTimeFrom) {
    let datepipeCurrent = this.datePipe.transform(this.currentDate, 'MM/dd/yyyy, h:mm a');
    let datepipedateTimeFrom = this.datePipe.transform(dateTimeFrom, 'MM/dd/yyyy, h:mm a');
    let newDate = new Date(datepipeCurrent);
    let fromDate = new Date(datepipedateTimeFrom);
    if (+fromDate <= +newDate || +fromDate === +newDate) {
      this.rentService.onUpdateStatusRentId(rentId, "Cancelled").subscribe(data => {
        this.toastr.success("Please refresh the page", "Successfully booking cancelled");
        this.rent = data;
        this.rentService.onBlackListUser(rentId, this.rent).subscribe(() => {
          this.rentService.ongetAllNotBlacklistUsersRent().subscribe(data => {
            this.list = data;
            this.rentService.rentListChange.next(this.list)
            this.toastr.info("All transactions of this user is cancelled.","User is added to the black lists");
          });
        });
      }, err => {
        this.toastr.error(err.error.message);
      });
    }
    else {
      this.toastr.info("User has time to collect");
    }
  }
}