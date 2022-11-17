import { Component, Input } from '@angular/core';
import { ICountryCase } from '../Models/icountry-case';
@Component({
  selector: 'app-case-table',
  templateUrl: './case-table.component.html',
  styleUrls: ['./case-table.component.css']
})
export class CaseTableComponent {
  @Input() combinedArray: ICountryCase[] = [];
}
