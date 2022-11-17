import { Component, Input } from '@angular/core';
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

  constructor(private util: UtilityComponent) { }

  @Input() countryInfoChild: any;

  ngOnChanges(): void{
    //console.log(this.countryInfoChild); //To check if parent component is sending data to child correctly..
    this.todayCases = this.util.prettyPrintStat(this.countryInfoChild.todayCases);
    this.cases = this.util.prettyPrintStat(this.countryInfoChild.cases);
    this.todayRecovered = this.util.prettyPrintStat(this.countryInfoChild.todayRecovered);
    this.todayDeaths = this.util.prettyPrintStat(this.countryInfoChild.todayDeaths);
    this.recovered = this.util.prettyPrintStat(this.countryInfoChild.recovered);
    this.deaths = this.util.prettyPrintStat(this.countryInfoChild.deaths);
  }
}
