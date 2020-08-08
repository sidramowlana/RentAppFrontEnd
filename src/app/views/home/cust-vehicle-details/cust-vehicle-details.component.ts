
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
import { TokenStorageService } from 'src/app/services/tokenStorage.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { ToastrService } from 'ngx-toastr';

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
  dob: String;
  userYear: number;
  currentYear: number;
  userId: number;
  bookingMessage: string;
  userAge: number;
  isBlackListed: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private vehicleService: VehicleService,
    private equipmentService: EquipmentService,
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private router: Router, private toastr: ToastrService,
    private rentService: RentService) { }

  ngOnInit() {
    this.initForm();
    this.equipmentService.onGetAllEquipmentService().subscribe(data => {
      this.equipmentList = data;
      console.log(this.equipmentList);

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
    // this.formDisabled = true;
  }


  onSubmit() {
    this.currentYear = new Date().getFullYear();
    const user = this.tokenStorageService.getUser();
    this.userId = user.id;
    this.userService.onGetUserById(this.userId).subscribe((data: User) => {
      this.dob = data.dob;
      this.isBlackListed = data.blackListed;
      console.log(this.isBlackListed);

      this.userYear = +this.dob.substring(0, 4);
      this.userAge = this.currentYear - this.userYear;
      if (this.isBlackListed == false) {
        if (this.images.length === 0) {
          this.toastr.warning("Please upload the required documents image");
        } else {
          if (this.userAge < 25) {
            if (this.name.includes("Small town")) {
              if ((this.rentForm.value.dateFrom === null) || (this.rentForm.value.dateTo === null)) {
                this.toastr.warning("Please Enter Your Booking Date");
              }
              else if ((this.rentForm.value.dateFrom !== null) && (this.rentForm.value.dateTo !== null)) {
                this.addNewRent(this.id, this.rentForm);
                this.router.navigate(['/rent']);
              }
            } else if (!this.name.includes("Small town")) {
              this.toastr.warning("User aged below 25 is allowed only to rent small town cars");
            }
          } else if (this.userAge > 25) {
            if ((this.rentForm.value.dateFrom === null) || (this.rentForm.value.dateTo === null)) {
              this.toastr.warning("Please Enter Your Booking Date");
            }
            else if ((this.rentForm.value.dateFrom !== null) && (this.rentForm.value.dateTo !== null)) {
              this.addNewRent(this.id, this.rentForm);
            }
          }
        }
      } else if (!this.isBlackListed == false) {
        this.toastr.error("User is black listed and not allowed to rent any vehicles from Bangers");
      }
    });

  }
  addNewRent(id, formData) {
    this.rentService.onCreateRentService(id, formData).subscribe(data => {
      this.bookingMessage = data.message;
      if (this.bookingMessage.includes("booking confirmed")) {
        this.toastr.success(this.bookingMessage);
        this.router.navigate(['/rent']);
      }
      else {
        this.toastr.warning(this.bookingMessage);
      }      
    },
      err => {
        console.log(err.error.message);
        this.toastr.error(err.error.message);
      });
  }

  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
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
  onEquipmentDetail(equipmentId) {
    this.router.navigate(['equipment/', equipmentId], { relativeTo: this.activatedRoute });
  }
}