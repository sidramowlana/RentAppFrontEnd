import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VehicleTypeService } from 'src/app/services/vehicleType.service';
import { VehicleType } from 'src/app/models/vehicleType.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css']
})

export class TypesComponent implements OnInit {

  vehicleTypeForm: FormGroup;
  isError: boolean = false;
  errorMessage: String;
  vehicleTypeList;
  editTypem: VehicleType;
  edit = false;
  id;
  vehicleData;


  constructor(private vehicleTypeService: VehicleTypeService,private toastr:ToastrService) { }

  private initForm() {
    this.vehicleTypeForm = new FormGroup({
      'name': new FormControl(null, Validators.required)    });
  }

  ngOnInit() {
    this.initForm();
    this.vehicleTypeService.onGetAllVehicleTypes().subscribe(typeList => {
      this.vehicleTypeList = typeList;
    });
   
    this.vehicleTypeService.edit.subscribe(updateList => {
      this.edit = true;
      this.id = updateList.vehicleTypeId;
      this.vehicleTypeForm.setValue({
        name: updateList.name
            });
    });
  }
  onAddVehicleType() {
    this.vehicleTypeService.onAddVehicleTypeService(this.vehicleTypeForm).subscribe(data => {
      console.log(data);
      this.vehicleData = data;
      this.vehicleTypeService.add.next(this.vehicleData);
      this.vehicleTypeList = data;
      this.vehicleTypeForm.reset();
      this.toastr.success("Successfully added");
    },
      err => {
        this.toastr.error(err.error.message);
      });
  }

  onUpdateVehicleType() {
    this.vehicleTypeService.onUpdateVehicleTypseService(this.vehicleTypeForm, this.id).subscribe(data => {
      this.edit = false;
      this.vehicleTypeService.update.next();  
      this.toastr.success("Successfully updated");  
      this.vehicleTypeForm.reset();
    }),
      err => {
        this.toastr.error(err.error.message);
      }
    this.vehicleTypeForm.reset();
  }

  onClearForm(){
    this.vehicleTypeForm.reset();
  }

  onEditVehicleType(index) {
    this.editTypem = this.vehicleTypeList[index];
    this.vehicleTypeService.edit.next(this.editTypem);
    this.vehicleTypeService.edit.subscribe(data => {
      this.edit = true;
      this.id = data.vehicleTypeId;
      this.vehicleTypeForm.setValue({
        name: data.name
            });
    });
  }

}
