import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EquipmentService } from 'src/app/services/equipment.service';
import { Equipment } from 'src/app/models/equipment.model';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css']
})
export class EquipmentListComponent implements OnInit {

  equipmentList;

  constructor(private equipmentService: EquipmentService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.equipmentService.onGetAllEquipmentService().subscribe((data:Equipment[]) => {
      this.equipmentList = data;
    });
    
    this.equipmentService.equipmentChange.subscribe(updateData=> {
        this.equipmentList = updateData;
    });
  }

  onEquipmentForm() {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }
}
