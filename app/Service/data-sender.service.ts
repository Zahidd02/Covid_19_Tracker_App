import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DataSenderService {
  invokeMapStatChange = new EventEmitter();

  constructor() { }

  onInfoButtonClick(caseType: string) {
    this.invokeMapStatChange.emit(caseType); //Emits the change with the value (caseType) as soon as the info-box is clicked
  }
}
