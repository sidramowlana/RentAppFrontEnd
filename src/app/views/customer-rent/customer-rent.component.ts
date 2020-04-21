import { Component, OnInit } from '@angular/core';
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
    });
  }

  greaterThan(current, to) {
    this.newDate = new Date(to)
    return current > this.newDate;
  }
  
}
