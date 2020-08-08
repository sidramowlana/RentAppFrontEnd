import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { VehicleTypeService } from 'src/app/services/vehicleType.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {

  @Input() vehicleSelected: any;
  @Input() id: number;

  vehicleUpdateForm: FormGroup;
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
    private vehicleService: VehicleService,private toastr:ToastrService,
    private vehicleTypeService: VehicleTypeService,
    private router: Router,
    private authService:AuthenticationService) { }

  ngOnInit() {
    this.vehicleTypeService.onGetAllVehicleTypes().subscribe(data1 => {
      this.vehicleTypeList = data1;
    });
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
       this.editMode = true;

        this.initForm();

        console.log("this is id: " + this.id);
        this.vehicleService.onGetVehicleById(this.id).subscribe(data => {        
         this.vehicleId = data.vehicleId;
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
    this.vehicleService.vehicleEditChange.subscribe(updateData=> {
      this.name = updateData.vehicleName;
      this.vehicleplateNo = updateData.plateNo;
      this.price = updateData.amount;
      this.vehicleQuantity = updateData.quantity;
      this.vehicleDescription = updateData.description;
      this.vehicleTypeName = updateData.vehicleType.name;
      this.vehicleimageUrl = updateData.imageUrl; 
     });
  }

  initForm() {
    if (this.editMode) {
      this.vehicleService.onGetVehicleById(this.id).subscribe(data => {
        this.vehicleUpdateForm.setValue({
          vehicleName: data.vehicleName,
          plateNo: data.plateNo,
          amount: data.amount,
          quantity: data.quantity,
          description: data.description,
          vehicleType: data.vehicleType.name,
          imageUrl: data.imageUrl
        });
      });
    }
    this.vehicleUpdateForm = new FormGroup({
      'vehicleName': new FormControl(null, Validators.required),
      'plateNo': new FormControl(null, Validators.required),
      'amount': new FormControl(null, Validators.required),
      'quantity': new FormControl(null, Validators.required),
      'vehicleType': new FormControl(null, Validators.required),
      'imageUrl': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required)
    });
  }
  onUpdateVehicle() {
    this.vehicleService.onUpdateVehicleService(this.vehicleUpdateForm, this.id).subscribe(data => {
      this.vehicleService.onGetAllVehicleService().subscribe(data => {
        this.vehicleList = data;
        for (let l of this.vehicleList) {
          if (l.vehicleId === this.id) {
            this.vehicleService.vehicleEditChange.next(l);
          }
        }
      });
    });
  }
  onClose() {
    this.router.navigate(['./'], { relativeTo: this.activatedRoute });
  }
  onCloseDetail(){
    this.router.navigate(['../'],{relativeTo:this.activatedRoute});
  }
  onDeleteVehicle(id){
    this.vehicleService.onDeleteVehicleService(id).subscribe(data=>{
      this.toastr.success("Successfully deleted");
      this.vehicleService.onGetAllVehicleService().subscribe(data => {
        this.vehicleList = data;
            this.vehicleService.vehicleChange.next(this.vehicleList);
      });this.onCloseDetail();
    },err=>{
      this.toastr.error(err.error.message);

    });
   
  }
}
