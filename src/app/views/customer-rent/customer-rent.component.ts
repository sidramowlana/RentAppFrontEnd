import { Component, OnInit } from '@angular/core';
import { RentService } from 'src/app/services/rent.service';
import { Rent } from 'src/app/models/rent.model';

@Component({
  selector: 'app-customer-rent',
  templateUrl: './customer-rent.component.html',
  styleUrls: ['./customer-rent.component.css']
})
export class CustomerRentComponent implements OnInit {
  rentList: Rent[];
  constructor(private rentService: RentService) { }

  ngOnInit() {
    console.log("hii")
    this.rentService.onGetAllRents().subscribe((data:Rent[]) => {
      this.rentList = data;
      console.log("hii2")
      console.log(data);
    });
  }

}
