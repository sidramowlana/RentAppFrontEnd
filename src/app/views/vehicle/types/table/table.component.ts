import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { VehicleType } from 'src/app/models/vehicleType.model';
import { VehicleTypeService } from 'src/app/services/vehicleType.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  
  vehicleTypeForm: FormGroup;
  isError: boolean = false;
  errorMessage: String;
  vehicleTypeList;
  editTypem: VehicleType;
  edit=false;
  id;

  constructor(private vehicleTypeService: VehicleTypeService) { }

  ngOnInit() {
    this.vehicleTypeService.onGetAllVehicleTypes().subscribe(data=>{
      console.log(data);
      this.vehicleTypeList = data;
    });
    this.vehicleTypeService.add.subscribe(data1 => {
      console.log(data1);
      this.vehicleTypeService.onGetAllVehicleTypes().subscribe(typeList => {
        console.log(typeList);
        this.vehicleTypeList = typeList;
        console.log(this.vehicleTypeList);

        });
    });
  }

  onEditVehicleType(index) {
    console.log("hey")
    this.editTypem = this.vehicleTypeList[index];
    this.vehicleTypeService.edit.next(this.editTypem);
  }



}
