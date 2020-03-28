import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  vehicleList
  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.onGetAllVehicleService().subscribe(data => {
      this.vehicleList = data;      
    });
    this.vehicleService.vehicleChange.subscribe(updateData=> {
      this.vehicleList = updateData;
  });
  }

}
