import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

let serviceUrl: string = "https://api.openweathermap.org/data/2.5/weather?"
let apiKey: string = "400f53912be3a2f709b996c1ddd175f8"

@Injectable({
  providedIn: 'root'
})

export class ClimaService {
  

  constructor(private http: HttpClient) {
   }

   LoadWeather(city: String): Observable<Object> {
     return this.http.get(serviceUrl + "q=" + city + "&appid=" + apiKey + "&units=metric&lang=es");
   }

   GetIconUrl(icon: String) {
     return 'https://openweathermap.org/img/w/' + icon + ".png"
   }
}
