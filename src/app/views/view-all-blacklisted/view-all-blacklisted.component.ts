import { Component, OnInit } from '@angular/core';
import { RentService } from 'src/app/services/rent.service';

@Component({
  selector: 'app-view-all-blacklisted',
  templateUrl: './view-all-blacklisted.component.html',
  styleUrls: ['./view-all-blacklisted.component.css']
})
export class ViewAllBlacklistedComponent implements OnInit {

  blackListUserRents;
  constructor(private rentService: RentService) { }

  ngOnInit() {
    this.rentService.ongetAllBlacklistUsersRent().subscribe(data => {
      this.blackListUserRents = data;
      console.log(data);
    });

  }

}
