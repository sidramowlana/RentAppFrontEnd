
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';
import { VehicleTypeService } from 'src/app/services/vehicleType.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { EquipmentService } from 'src/app/services/equipment.service';
import { NgOption } from '@ng-select/ng-select';

@Component({
  selector: 'app-cust-vehicle-details',
  templateUrl: './cust-vehicle-details.component.html',
  styleUrls: ['./cust-vehicle-details.component.css']
})
export class CustVehicleDetailsComponent implements OnInit {

  @Input() vehicleSelected: any;
  @Input() id: number;

  editMode = false;
  vehicleId: number;
  name: String;
  vehicleplateNo: String;
  price: number;
  vehicleDescription: String;
  vehicleQuantity: number;
  vehicleimageUrl: String;
  vehicleTypeName: String;
  vehicleTypeList;
  vehicleList;
  equipmentList;
  
  selectedEquipments:NgOption=[];
  rentForm:FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private vehicleService: VehicleService,
    private vehicleTypeService: VehicleTypeService,
    private equipmentService: EquipmentService,
    private router: Router,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.initForm();
    this.equipmentService.onGetAllEquipmentService().subscribe(data => {
      this.equipmentList = data;
    });

    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = true;

        this.vehicleService.onGetVehicleById(this.id).subscribe(data => {
          this.name = data.vehicleName;
          this.vehicleplateNo = data.plateNo;
          this.price = data.amount;
          this.vehicleQuantity = data.quantity;
          this.vehicleDescription = data.description;
          this.vehicleTypeName = data.vehicleType.name;
          this.vehicleimageUrl = data.imageUrl;
        });
      }
    );
  }

  initForm(){
    // this.rentForm = new FormGroup({new FormControl)
    this.rentForm = new FormGroup({
      'selectedEquipments': new FormControl(null, Validators.required) 
       });
  }
  onClose() {
    this.router.navigate(['./'], { relativeTo: this.activatedRoute });
  }
  onCloseDetail() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
  onPrev() {
    console.log("previosing");
  }
  onNext() {
    console.log("nexting");
  }
  onSubmit(){
    console.log(this.rentForm);
  }
}