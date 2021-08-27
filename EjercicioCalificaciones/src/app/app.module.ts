import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FusionChartsModule } from 'angular-fusioncharts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSliderModule } from '@angular/material/slider';
import { DropDirective } from './drop.directive';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http'
import { ClimaService } from './services/clima.service'

import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts'
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';


FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme);

@NgModule({
  declarations: [
    AppComponent,
    DropDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatTableModule, 
    MatSliderModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    FusionChartsModule,
    MatToolbarModule,
    HttpClientModule,
  ],
  providers: [ClimaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
