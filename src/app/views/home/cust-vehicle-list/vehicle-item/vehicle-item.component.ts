import { Component, OnInit, Input } from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle.model';

@Component({
  selector: 'app-vehicle-item',
  templateUrl: './vehicle-item.component.html',
  styleUrls: ['./vehicle-item.component.css']
})
export class VehicleItemComponent implements OnInit {

  @Input() vehicleElement:Vehicle;
  @Input() index:number;
  constructor() { }

  ngOnInit() {
  }

}
