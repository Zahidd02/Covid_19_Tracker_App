import { AfterViewInit, Component, Input } from '@angular/core';
import * as L from 'leaflet';
import { DataSenderService } from '../Service/data-sender.service';

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css']
})

export class MapComponentComponent implements AfterViewInit {

  @Input() locationData: any;
  worldMap: any; 
  circle: any[] = [];

  constructor(private service: DataSenderService) { }

  ngAfterViewInit(): void {
    this.buildMap();
    this.getCaseTypeCircles();
    this.service.invokeMapStatChange.subscribe((caseType) => { //Binds the service emitter to do various tasks (here the task is to call 'mapStatChange()' method and pass a value)
      this.mapStatChange(caseType);
    })
  }

  ngOnChanges(): void {
    if (this.locationData.countryInfo == undefined) { //returns the control as initially the data will be 'undefined', unless something is changed on the page
      return;
    }
    this.worldMap.flyTo([this.locationData.countryInfo.lat, this.locationData.countryInfo.long], 5);//flies you off to another location. Weeeeeheee..Xd
    L.popup().setLatLng([this.locationData.countryInfo.lat, this.locationData.countryInfo.long]) // To open popup after map flies to the location.
      .setContent(this.customPopup(this.locationData.countryInfo.flag, this.locationData.country, this.locationData.cases, this.locationData.recovered, this.locationData.deaths))
      .openOn(this.worldMap);
  }

  private buildMap(): void {
    this.worldMap = L.map('world-map', {
      center: [39.8282, -98.5795],
      zoom: 4,
      maxBounds: [
        [85, 180],
        [-85, -180]
      ]     
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>', //Not necessary just a copyright formality
      noWrap: true
    });
    tiles.addTo(this.worldMap);
  }

  getCaseTypeCircles = async (stat: string = 'cases', color: string = '#CC1034', multiplier: number = 100) => {
    await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        for (var item in data) {
          var radius: number = Math.sqrt(data[item][stat]) * multiplier; //The bigger the circle the more COVID is spread. Also, the 'multiplier' is totally cosmetic.
          var flagURL = data[item].countryInfo.flag;
          this.circle.push(L.circle([data[item].countryInfo.lat, data[item].countryInfo.long], radius, { color: color }).addTo(this.worldMap)
            .bindPopup(this.customPopup(flagURL, data[item].country, data[item].cases, data[item].recovered, data[item].deaths)));
        }
      });
  }

  customPopup(flagURL: any, countryName: any, cases: any, recovered: any, deaths: any): string { //'.bindPopup' can be customized using HTML and CSS properties.
    var result =
     "<div class='custom-popup'>" + //classes and ids are customized from './styles.css'.
      "<img id='flag' src=" + `${flagURL}` + ">" +
      "<div id='countryName'>" + `${countryName}` + "</div>" +
      "<div id='inner-content'>" + `<b>Cases: </b>${cases}` + "</div>" +
      "<div id='inner-content'>" + `<b>Recovered: </b>${recovered}` + "</div>" +
      "<div id='inner-content'>" + `<b>Deaths: </b>${deaths}` + "</div>" +
      "</div>";
    return result;
  }

  mapStatChange(stat: string) {
    var color;
    var multiplier;

    this.clearContent();//Clears the variable 'this.circle' and removes all the previous circles from world map. They will be recreated from info-box

    if (stat == "cases") {
      color = '#CC1034'
      multiplier = 100;
    }
    else if (stat == "recovered") {
      multiplier = 90;
      color = '#40B92B'
    }
    else {
      multiplier = 700;
      color = '#43565C'
    }
    this.getCaseTypeCircles(stat, color, multiplier);
  }

  //Clears content on map
  clearContent() : void { 
    for (var item in this.circle) {
      this.worldMap.removeLayer(this.circle[item]);
    }
    this.circle = [];
  }
}
