import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';
import { VehicleTypeService } from 'src/app/services/vehicleType.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { EquipmentService } from 'src/app/services/equipment.service';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private vehicleService: VehicleService,
    private vehicleTypeService: VehicleTypeService,
    private equipmentService: EquipmentService,
    private router: Router,
    private authService: AuthenticationService) { }
  equipmentList;
  length:number;
  ngOnInit() {
    this.equipmentService.onGetAllEquipmentService().subscribe(data => {
      console.log(data);
      this.equipmentList = data;
      this.length = this.equipmentList.length;
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
}
