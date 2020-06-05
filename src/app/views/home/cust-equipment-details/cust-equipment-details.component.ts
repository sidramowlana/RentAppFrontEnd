import { Component, OnInit } from '@angular/core';
import { EquipmentService } from 'src/app/services/equipment.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cust-equipment-details',
  templateUrl: './cust-equipment-details.component.html',
  styleUrls: ['./cust-equipment-details.component.css']
})
export class CustEquipmentDetailsComponent implements OnInit {
  id: number;
  equipmentId: number;
  equipmentName: String;
  amount: number;
  imageUrl: String;
  description: String;
  message: String;
  list;
  constructor(private equipmentService: EquipmentService,
    private location: Location,
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

  onClose() {
    this.location.back();
  }
}
