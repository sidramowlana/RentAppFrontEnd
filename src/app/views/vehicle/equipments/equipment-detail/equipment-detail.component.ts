import { Component, OnInit, Input } from '@angular/core';
import { EquipmentService } from 'src/app/services/equipment.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

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
    private router: Router) { }

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
    this.router.navigate(['edit'],{relativeTo:this.activatedRoute});
  }

  onDeleteEquipment(id) {
    this.equipmentService.onDeleteEquipmentService(id).subscribe(() => {
      this.message = "Successfully Deleted";
      this.equipmentService.onGetAllEquipmentService().subscribe(data => {
        this.list = data;
        this.equipmentService.equipmentChange.next(this.list);
      });
    });
    this.router.navigate(['vehicle/equipments']);
  }
}