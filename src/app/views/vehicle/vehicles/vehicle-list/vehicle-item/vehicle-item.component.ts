import { Component, OnInit, Input } from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vehicle-item',
  templateUrl: './vehicle-item.component.html',
  styleUrls: ['./vehicle-item.component.css']
})
export class VehicleItemComponent implements OnInit {

  @Input() vehicleElement: Vehicle;
  @Input() index: number;
  message: String;
  isLogged;
  constructor(private authService: AuthenticationService,
    private router: Router, private toastr: ToastrService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }
  onDetails(index) {
    if (this.authService.loggedIn()) {
      this.router.navigate([index], { relativeTo: this.activatedRoute });
    }
    else {
      this.toastr.info("Log in to view the details");
    }
  }
}
