import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VehicleTypeService } from 'src/app/services/vehicleType.service';
import { VehicleType } from 'src/app/models/vehicleType.model';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Router, ActivatedRoute } from '@angular/router';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  vehicleForm: FormGroup;
  vehicleTypeList:VehicleType[];
  vehicleList;
  isError:boolean=false;
  isSubmitted:boolean=false
  message:String;


  constructor(private vehicleTypeService:VehicleTypeService,
    private vehicleService:VehicleService,
    private router:Router,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
  }

  onAdd(){
    this.router.navigate(['vehicles/new'],{relativeTo:this.activatedRoute});
  }
}
