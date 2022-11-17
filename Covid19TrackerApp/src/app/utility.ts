import { Injectable } from "@angular/core";
import { NumeralPipe } from "ngx-numeral";
import { ICountryCase } from "./Models/icountry-case";

@Injectable({
  providedIn: 'root',
})

export class UtilityComponent {
  //This sorts the incoming data using the 'case' property
  public sortData(data: ICountryCase[]): ICountryCase[] {
    var sortedData = data.sort((a, b) => {
      return b.case - a.case;
    })
    return sortedData;
  }

  //Thie adds the + symbol in case of huge number
  public prettyPrintStat(stat: any): any { 
    const numeral = new NumeralPipe(stat);
    var result;
    stat ? result = numeral.format("+" + "0.0a") : result = "No cases were detected..";
    return result;
  }
}


