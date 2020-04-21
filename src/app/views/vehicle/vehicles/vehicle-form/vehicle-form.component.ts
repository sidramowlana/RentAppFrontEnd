import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VehicleType } from 'src/app/models/vehicleType.model';
import { VehicleTypeService } from 'src/app/services/vehicleType.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Router, ActivatedRoute } from '@angular/router';
import { VehiclesComponent } from '../vehicles.component';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {


  vehicleForm: FormGroup;
  vehicleTypeList:VehicleType[];
  vehicleList;
  isError:boolean=false;
  isSubmitted:boolean=false
  message:String;

  constructor(
    private vehicleTypeService:VehicleTypeService,
    private vehicleService:VehicleService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    ) {}

  ngOnInit() {
    this.initForm();
    this.vehicleTypeService.onGetAllVehicleTypes().subscribe(data=>{
      this.vehicleTypeList = data;
    });
  }

  private initForm() {
    this.vehicleForm = new FormGroup({
      'vehicleName': new FormControl(null, Validators.required),
      'plateNo': new FormControl(null, Validators.required),
      'amount':new FormControl(null,Validators.required),
      'quantity': new FormControl(null, Validators.required),
      'vehicleType': new FormControl(null, Validators.required),
      'imageUrl': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required)
    });
  }

  onShowForms(){    
    this.isError = false;
    this.isSubmitted= false;
    // this.router.navigate([''newForm'],{relativeTo:this.activatedRoute});
  }

  onAddVehicle(){
    this.vehicleService.onAddVehicleService(this.vehicleForm).subscribe(data=>{
      console.log(this.vehicleForm);
      this.vehicleService.onGetAllVehicleService().subscribe(data => {
        this.vehicleList = data;
        this.vehicleService.vehicleChange.next(this.vehicleList);
      });
      this.isError = false;
      this.isSubmitted = true;
      this.message = "Successfully Added";
      this.vehicleForm.reset();
    },
    err=>{
      this.isError = true;
      this.isSubmitted = false;
      this.message = err.error.message;      
    });
    // this.vehicleForm.reset();
  }
  onClose(){
    this.router.navigate(['./'],{relativeTo:this.activatedRoute});
  }
}
