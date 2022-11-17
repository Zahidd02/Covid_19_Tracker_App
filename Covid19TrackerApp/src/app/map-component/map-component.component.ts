import { AfterViewInit, Component, Input } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css']
})
export class MapComponentComponent implements AfterViewInit {

  @Input() locationData: any;
  worldMap: any; 
  marker: any;
  popupCountry: any[] = [];
  isFirstTime: boolean = true;

  ngAfterViewInit(): void {
    this.initMap();
    this.getEveryCountriesData();
  }

  ngOnChanges(): void {
    if (this.locationData.countryInfo == undefined) {
      return;
    }
    this.worldMap.flyTo([this.locationData.countryInfo.lat, this.locationData.countryInfo.long], 4);//flies you off to another location. Weeeeeheee..Xd
    L.popup().setLatLng([this.locationData.countryInfo.lat, this.locationData.countryInfo.long]) // To open popup after map flies to the location.
      .setContent(this.customPopup(this.locationData.countryInfo.flag, this.locationData.country, this.locationData.cases, this.locationData.recovered, this.locationData.deaths))
      .openOn(this.worldMap);
  }

  private initMap(): void {
    this.worldMap = L.map('world-map', {
      center: [39.8282, -98.5795],
      zoom: 4,
      maxBounds: [
        [85, 180],
        [-85, -180]
      ], 
      
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      noWrap: true
    });
    tiles.addTo(this.worldMap);
  }

  getEveryCountriesData = async () => {
    await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        for (var item in data) {
          var radius: number = Math.sqrt(data[item].cases) * 100; //The bigger the circle the more COVID is spread, the value '100' was obtained after several trials and errors.
          var flagURL = data[item].countryInfo.flag;
          this.marker = L.circle([data[item].countryInfo.lat, data[item].countryInfo.long], radius, { color: '#CC1034' }).addTo(this.worldMap);
          this.marker.bindPopup(this.customPopup(flagURL, data[item].country, data[item].cases, data[item].recovered, data[item].deaths));
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
}
