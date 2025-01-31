import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { map, Observable } from 'rxjs';
import { CurrentWeather } from '../../models/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {}

  public getCurrentWeather(lat: number, lon: number, unit = 'celsius'): Observable<CurrentWeather> {
    return this.http
      .get<any>(`${environment.weatherApi}forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&temperature_unit=${unit}`)
      .pipe(
        map(data => {
            return {
              temperature: data.current.temperature_2m,
              time: data.current.time,
              weathercode: data.current.weather_code,
              windspeed: data.current.wind_speed_10m,
              humidity: data.current.relative_humidity_2m,
            } as CurrentWeather
        })
      );
  }
}
