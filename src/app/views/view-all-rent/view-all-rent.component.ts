import { Component, OnInit } from '@angular/core';
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
  constructor(private rentService: RentService,
    private datePipe: DatePipe,private toastr:ToastrService,
    private blackListService: BlackListService) { }

  ngOnInit() {
    this.rentService.ongetAllNotBlacklistUsersRent().subscribe(data => {
      this.allRentList = data;
    });
    this.rentService.rentListChange.subscribe(updateData => {
      this.allRentList = updateData;
    });
  }

  onCancel(rentId) {
    console.log(rentId);
    this.rentService.onGetRent(rentId).subscribe(rent => {
      this.rent = rent;
      this.rentService.onBlackListUser(rentId, rent).subscribe(data => {
        this.rentService.ongetAllNotBlacklistUsersRent().subscribe(data => {
          this.list = data;
          this.rentService.rentListChange.next(this.list)
          this.message = "User is added to the black lists";
          this.toastr.info("User is added to the black lists");

          this.rentService.onDeleteRentByRentId(rentId).subscribe(data => {
            console.log("deleted");
          });
        });
      });
    });
    // this.blackListService.onAddBlackList(rentId).subscribe(data => {
    //   this.list = data
    //   console.log(data);
    //   this.message = "User is added to the black lists";
    //   this.rentService.onDeleteRentByRentId(rentId).subscribe(data => {
    //     console.log("deleted");
    //   });

    //   this.blackListService.blackListChange.next(this.list);

    // });

  }

  onTaken(rentId, toTime) {
    this.rentService.onGetRent(rentId).subscribe(rent => {
      this.rent = rent;
      this.datepipeCurrent = this.datePipe.transform(this.currentDate, 'MM/dd/yyyy, h:mm a');
      this.datepipeToTime = this.datePipe.transform(toTime, 'MM/dd/yyyy, h:mm a');
      if (this.datepipeToTime !== this.datepipeCurrent) {
        this.isTime = false;
        this.message = "The customer have his time to collect the rented vehicle";
      }
      else {
        this.isTime = true;
        this.message = "User have collected it successfully";

        this.rentService.onTakenRentById(rentId, this.rent).subscribe(data => {
          console.log(data);
        });
      }
    });
  }
}
