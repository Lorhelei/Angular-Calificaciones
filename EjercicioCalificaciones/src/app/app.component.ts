import { AfterViewInit, Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { Alumnos } from './models/alumnos.model';
import { Clima } from "./models/clima.model";
import { ExcelService } from './services/excel.service';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ClimaService } from './services/clima.service'

interface chartDataSource{
  chart: {}
  data: [ {label: string, value: string} | null ]
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {
  title = 'Simulador de Estudiantes';

  clima: Clima = new Clima();
  city: string = "Hermosillo";
  icono: string = "";
  
  chartSource: chartDataSource = {chart: {}, data:[null]} ; 

  @ViewChild(MatPaginator, {static: false})
    set paginator(value: MatPaginator) {
      if (this.dataSource){
        this.dataSource.paginator = value;
      }
  }
  @ViewChild(MatSort, {static: false})
    set sort(value: MatSort) {
      if (this.dataSource){
        this.dataSource.sort = value;
      }
  }
  
  alfabeto: string = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"
  claves: string[] = [];
  ImportedData: Alumnos[] = [];
  fileLoaded: boolean = false;
  dataSource = new MatTableDataSource(this.ImportedData);
  mejorCalificacion: Alumnos = new Alumnos;
  peorCalificacion: Alumnos = new Alumnos;
  promedio: number = 0;

  columnsToDisplay = [
    'nombre', 
    'aPaterno',
    'aMaterno',
    'fechaNacimiento',
    'grado',
    'grupo',
    'calificacion',
    'clave',
  ]



  desplazamiento = 0;

  constructor(private excelSrv: ExcelService, private climaService: ClimaService){
    this.chartSource.chart = {
      caption:"Calificaciones",
      xAxisName:"Alumnos",
      yAxisName:"Calificacion",
      theme: "fusion"
    }
  }

  ngAfterViewInit(){
    this.climaService.LoadWeather(this.city).subscribe(data => {

        var main = data as any

        this.clima.city = main["name"]
        this.clima.temperature = main["main"]["temp"]
        this.clima.conditions = main["weather"][0]["description"]
        this.clima.icon = main["weather"][0]["icon"]
        this.icono = this.climaService.GetIconUrl(this.clima.icon)

    });


  }

  OnSliderChange(event: any){
    this.desplazamiento = event.value;
    this.SetClaveDesplazada(event.value);
    
  }

  SetClaveDesplazada(value: number){
    var claveNormal = ""
    var claveShifteada = "";
    var lugar = 0;


    for (let index = 0; index < this.dataSource.data.length; index++) {
      claveShifteada = "";
      claveNormal = this.claves[index]

            for (let indexClave = 0; indexClave < claveNormal.length; indexClave++){                        
              lugar = value + indexClave;
              if (lugar > claveNormal.length -1) {
                lugar -= claveNormal.length;
              }
              claveShifteada += claveNormal[lugar]
            }
      this.dataSource.data[index].clave = claveShifteada;
    }    
  }

  OnFileChange(event: FileList){
    const target: FileList = <FileList>(event);
    if (target.item.length != 1) {
      throw new Error('Cannot use multiple files');
    }

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      var count = 0;
      const bstr: string = e.target.result;
      const data = <any[]>this.excelSrv.ImportFromFile(bstr);
      const header: string[] = Object.getOwnPropertyNames(new Alumnos());
      const importedData = data.slice(1);

      this.dataSource.data = importedData.map(arr => {
        const obj: {[index: string]: any} = {};
        for (let i = 0; i < header.length; i++) {
          const k = header[i];
          obj[k] = arr[i];
        }

        obj["clave"] = this.SetClave(obj);
        this.claves[count] = obj["clave"];
        this.SetAnalitics(obj);     
        this.setDataChart(obj["aPaterno"], obj["aMaterno"], obj["calificacion"]);
        count++;
        return <Alumnos>obj;
      })
    this.OnFileLoaded();
    };
    reader.readAsBinaryString(target[0]);

  }

  SetAnalitics(obj: any){
    if (obj["calificacion"] > this.mejorCalificacion.calificacion) {
      this.mejorCalificacion = <Alumnos>obj;
    }
    else if((obj["calificacion"] < this.peorCalificacion.calificacion) ||(this.peorCalificacion.nombre == "")){
      this.peorCalificacion = <Alumnos>obj;
    }
    this.promedio += obj["calificacion"];
  }

  SetClave(obj: any) {
        var clave: string = "";
        var shift: string = "";
        var char: string = "";
        var letras = obj["nombre"].substring(0,2) + obj["aMaterno"].substring(obj["aMaterno"].length - 2);
        letras = letras.toUpperCase();

        var fecha = obj["fechaNacimiento"].split("/", 3);        
        var today = new Date();
        var fechaN = new Date(fecha[2] + "/" + fecha[1] + "/" + fecha[0]);

        var edad = today.getFullYear() - fechaN.getFullYear();
        var m = today.getMonth() - fechaN.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < fechaN.getDate())) {
          edad--;
        }

        var shifted: number = 0;
        

        for (var i = 0; i < letras.length; i++) {
          char = letras[i];
          if(this.alfabeto.indexOf(char)> -1){
            shifted = this.alfabeto.indexOf(char) - 3;
            if (shifted < 0) {
              shifted = this.alfabeto.length + shifted;
            }          
          }
          else{
            
          };
          shift += this.alfabeto[shifted];
        }
        
        clave = shift + edad;

        return clave;
  }

  setDataChart(apellido: string, nombres: string, calificacion: string){
    var data;
    data = {label: apellido + ' ' + nombres, value: calificacion};
    this.chartSource.data.push(data);
  }
  
  OnFileLoaded()
  {
      if (this.dataSource.data.length > 0) {
        this.fileLoaded = true;
        
        this.promedio = this.promedio / this.dataSource.data.length;
        const factor = Math.pow(10, 2)
        this.promedio = Math.round(this.promedio * factor) / factor
    }
  }
}


