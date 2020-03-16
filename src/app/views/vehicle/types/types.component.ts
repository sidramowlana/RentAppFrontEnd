import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VehicleTypeService } from 'src/app/services/vehicleType.service';
import { VehicleType } from 'src/app/models/vehicleType.model';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css']
})

export class TypesComponent implements OnInit {

  vehicleTypeForm: FormGroup;
  isError: boolean = false;
  errorMessage: String;
  vehicleTypeList: VehicleType[];
  editTypem: VehicleType;
  edit = false;
  id;

  constructor(private vehicleTypeService: VehicleTypeService) { }

  private initForm() {
    this.vehicleTypeForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, Validators.required)
    });
  }
  
  ngOnInit() {
    this.initForm();
    this.vehicleTypeService.onGetAllVehicleTypes().subscribe(typeList => {
      console.log(typeList);
      this.vehicleTypeList = typeList;
    });
    this.vehicleTypeService.edit.subscribe(updateList => {
      this.edit = true;
      this.id = updateList.vehicleTypeId;
      this.vehicleTypeForm.setValue({
        name: updateList.name,
        amount: updateList.amount
      });
    });
  }


  onAddVehicleType() {
    this.vehicleTypeService.onAddVehicleTypeService(this.vehicleTypeForm).subscribe(data => {
      console.log(data);
      this.vehicleTypeList = data;
      this.isError = false;
      this.vehicleTypeForm.reset();
      this.errorMessage = "Successfully added";
    },
      err => {
        this.errorMessage = err.error.message;
        this.isError = true;
      });
  }

  onUpdateVehicleType() {
    console.log("update");
    this.vehicleTypeService.onUpdateVehicleTypseService(this.vehicleTypeForm, this.id).subscribe(data => {
      this.isError = false
      this.edit = false;
      this.vehicleTypeForm.reset();
    }),
      err => {
        this.errorMessage = err.error.message;
        this.isError = true;
      }
    this.vehicleTypeForm.reset();
  }

  onClearForm(){
    this.vehicleTypeForm.reset();
  }

  onEditVehicleType(index) {
    console.log("hey")
    this.editTypem = this.vehicleTypeList[index];
    this.vehicleTypeService.edit.next(this.editTypem);
    this.vehicleTypeService.edit.subscribe(data => {
      this.edit = true;
      this.id = data.vehicleTypeId;
      this.vehicleTypeForm.setValue({
        name: data.name,
        amount: data.amount
      });
    });
  }

}
