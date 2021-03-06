import { Component, OnInit, Input } from '@angular/core';
import { EquipmentService } from 'src/app/services/equipment.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-equipment-detail',
  templateUrl: './equipment-detail.component.html',
  styleUrls: ['./equipment-detail.component.css']
})
export class EquipmentDetailComponent implements OnInit {

  @Input() equipmentSelected: any;
  @Input() id: number;

  equipmentId: number;
  equipmentName: String;
  amount: number;
  imageUrl: String;
  description: String;
  message: String;
  list;

  constructor(private equipmentService: EquipmentService,
    private activatedRoute: ActivatedRoute,
    private router: Router,private toastr:ToastrService,
    private authService:AuthenticationService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        console.log("this is id: " + this.id);
        this.equipmentService.onGetEquipmentById(this.id).subscribe(data => {
          console.log(data);
          this.equipmentId = data.equipmentId;
          this.equipmentName = data.equipmentName;
          this.amount = data.amount;
          this.imageUrl = data.imageUrl;
          this.description = data.description;
        });
      }
    );
  }

  onUpdateEquipment(){
    this.router.navigate(['editEquipment'],{relativeTo:this.activatedRoute});
  }

  onDeleteEquipment(id) {
    this.equipmentService.onDeleteEquipmentService(id).subscribe(() => {
      this.toastr.success("Successfully Deleted");
      this.equipmentService.onGetAllEquipmentService().subscribe(data => {
        this.list = data;
        this.equipmentService.equipmentChange.next(this.list);
      });
    },err=>
    {
      this.toastr.error(err.error.message);
    });
    this.router.navigate(['vehicle/equipments']);
  }
}