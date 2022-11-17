import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MapComponentComponent } from './map-component/map-component.component';
import { InfoBoxComponent } from './info-box/info-box.component';
import { CaseTableComponent } from './case-table/case-table.component';
import { LineGraphComponent } from './line-graph/line-graph.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponentComponent,
    InfoBoxComponent,
    CaseTableComponent,
    LineGraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule
  ],
  providers: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
