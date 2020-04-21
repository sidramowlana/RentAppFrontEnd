import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-cust-vehicle-list',
  templateUrl: './cust-vehicle-list.component.html',
  styleUrls: ['./cust-vehicle-list.component.css']
})
export class CustVehicleListComponent implements OnInit {
  vehicleList
  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.onGetAllVehicleService().subscribe(data => {
      this.vehicleList = data;
      console.log(this.vehicleList);
    });
  }
}
