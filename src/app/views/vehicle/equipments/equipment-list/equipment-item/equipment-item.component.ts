import { Component, OnInit, Input } from '@angular/core';
import { Equipment } from 'src/app/models/equipment.model';

@Component({
  selector: 'app-equipment-item',
  templateUrl: './equipment-item.component.html',
  styleUrls: ['./equipment-item.component.css']
})
export class EquipmentItemComponent implements OnInit {

  @Input() equipmentElement:Equipment;
  @Input() index:number;
 
  constructor() { }

  ngOnInit() {
  }

}
