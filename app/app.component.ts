import { Component, OnInit } from '@angular/core';
import { ICountryCase } from './Models/icountry-case';
import { UtilityComponent } from './utility';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  countries_mapper = new Map<string, string>();//The value part is sent to onCountryChange method to change info card details
  countries: string[] = [];
  countryInfoParent: any; 

  //For populating right-side table in descending order
  countryBySortedCases: ICountryCase[] = [];

  constructor(private util: UtilityComponent) { }

  ngOnInit() {
    this.getCountriesData();
    this.getFirstTimeData();
  }

  getCountriesData = async () => {
    await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => {
        return response.json(); //Returns the response which goes into the next "then" calling function.
      })
      .then((data) => {
        var countryCaseTemp: ICountryCase[] = []; //Temporary array that will be used to initiate actual 'countryBySortedCases' array
        this.countries_mapper.set("Worldwide", "WWW");
        for (var item in data) {
          this.countries_mapper.set(data[item].country, data[item].countryInfo.iso2); //For the info card component
          this.countries.push(data[item].country);//This pushes the country for the dropdown

          var temp: ICountryCase = { country: data[item].country, case: data[item].cases }; //For right-side table
          countryCaseTemp.push(temp);
        }
        this.countryBySortedCases = this.util.sortData(countryCaseTemp); //For data sorting
      });
  }

  getFirstTimeData = async () => { //For when loading the app for the first time, the cards stay empty and looks weird XD..
    await fetch(`https://disease.sh/v3/covid-19/all`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.countryInfoParent = data;
      });
  }

  onCountryChange = async (country_choosed: string) => { //For changing the data on changing the dropdown option.
    const url = country_choosed === 'WWW' ? `all` : `countries/${country_choosed}`;

    await fetch(`https://disease.sh/v3/covid-19/` + url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.countryInfoParent = data;
      });
  }
}

