import { Component, OnInit } from '@angular/core';
import { InsurerService } from 'src/app/services/insurer.service';

@Component({
  selector: 'app-fraud-license',
  templateUrl: './fraud-license.component.html',
  styleUrls: ['./fraud-license.component.css']
})
export class FraudLicenseComponent implements OnInit {
insurerLicenseList;
  constructor(private insurerService:InsurerService) { }

  ngOnInit() {
    this.insurerService.onGetFraudLicenseService().subscribe(data=>{
      console.log(data)
      this.insurerLicenseList=data;
    });
  }

}
