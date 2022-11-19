import { Component, Input } from '@angular/core';
import { DataSenderService } from '../Service/data-sender.service';
import { UtilityComponent } from '../utility';

@Component({
  selector: 'app-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.css']
})

export class InfoBoxComponent {
  todayCases: any;
  cases: any;
  todayRecovered: any;
  recovered: any;
  todayDeaths: any;
  deaths: any;

  constructor(private util: UtilityComponent, private service: DataSenderService) { }

  @Input() countryInfoChild: any;

  ngOnChanges(): void {
    //console.log(this.countryInfoChild); //To check if parent component is sending data to child correctly..
    this.todayCases = this.util.prettyPrintStat(this.countryInfoChild.todayCases);
    this.cases = this.util.prettyPrintStat(this.countryInfoChild.cases);
    this.todayRecovered = this.util.prettyPrintStat(this.countryInfoChild.todayRecovered);
    this.todayDeaths = this.util.prettyPrintStat(this.countryInfoChild.todayDeaths);
    this.recovered = this.util.prettyPrintStat(this.countryInfoChild.recovered);
    this.deaths = this.util.prettyPrintStat(this.countryInfoChild.deaths);
  }

  toChangeMapService(caseType: string): void {
    this.service.onInfoButtonClick(caseType); //Sends the clicked case type to service.
  }
}
