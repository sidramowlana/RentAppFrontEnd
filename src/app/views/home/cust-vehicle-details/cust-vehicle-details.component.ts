
import { Component, OnInit, Input } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';
import { VehicleTypeService } from 'src/app/services/vehicleType.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { EquipmentService } from 'src/app/services/equipment.service';
import { RentService } from 'src/app/services/rent.service';

@Component({
  selector: 'app-cust-vehicle-details',
  templateUrl: './cust-vehicle-details.component.html',
  styleUrls: ['./cust-vehicle-details.component.css'],
})
export class CustVehicleDetailsComponent implements OnInit {

  public dateTimeRange: Date[];
  public todayDate = new Date();
  images = [];
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
  rentForm: FormGroup;
  formDisabled = true;
  message;

  constructor(
    private activatedRoute: ActivatedRoute,
    private vehicleService: VehicleService,
    private equipmentService: EquipmentService,
    private router: Router,
    private rentService: RentService) { }

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

  initForm() {
    this.rentForm = new FormGroup({
      'selectedEquipments': new FormControl(null, Validators.required),
      'dateFrom': new FormControl(null, Validators.required),
      'dateTo': new FormControl(null, Validators.required),
      'drivingLicenceImagefile': new FormControl(null, Validators.required),
      'utilityBillImagefile': new FormControl(null, Validators.required)
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
    this.formDisabled = true;
  }
  onNext() {
    console.log("nexting");
  }
  onSubmit() {
    if ((this.rentForm.value.dateFrom === null) || (this.rentForm.value.dateTo === null)) {
      console.log(this.rentForm.value.dateFrom);
      console.log("Cant submit");
      this.formDisabled = false;
      this.message = "Please Enter Your Date"
    }
    else if ((this.rentForm.value.dateFrom !== null) && (this.rentForm.value.dateTo !== null)) {
      console.log(this.rentForm.value.dateFrom);
      console.log(this.id, this.rentForm);
      this.formDisabled = true;
      this.addNewRent(this.id, this.rentForm);
    }
  }

  addNewRent(id, formData) {
    console.log(id,formData);
    this.rentService.onCreateRentService(id, formData).subscribe(data => {
      console.log(data+" working");
    });
  }

  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          console.log(event.target);
          this.images.push(event.target.result);
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  removeAllImage() {
    this.images.splice(0, this.images.length);
  }

  onRemove(index) {
    this.images.splice(index, 1);
  }

}