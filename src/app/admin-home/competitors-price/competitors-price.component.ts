import { Component, OnInit } from '@angular/core';
import { Webscraping } from 'src/app/services/webscraping.service';

@Component({
  selector: 'app-competitors-price',
  templateUrl: './competitors-price.component.html',
  styleUrls: ['./competitors-price.component.css']
})
export class CompetitorsPriceComponent implements OnInit {

  vehicle;
  ratePerMonth;
  ratePerWeek;
  excessMilagePerDay;
  webScrapeList;
  constructor(private webScrapeData: Webscraping) { }

  ngOnInit() {
    this.webScrapeData.onGetWebScrapeDataService().subscribe(data => {
      console.log(data)
      this.webScrapeList=data
      this.vehicle = data.vehcileName;
      this.ratePerMonth = data.ratePerMonth;
      this.ratePerWeek = data.ratePerWeek;
      this.excessMilagePerDay = data.excessMilagePerDay
    });
  }
}
