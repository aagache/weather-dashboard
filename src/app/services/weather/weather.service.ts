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
      .get<any>(`
          ${environment.weatherApi}forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=${unit}
        `)
      .pipe(
        map(data => {
            return {
              temperature: data.current_weather.temperature,
              time: data.current_weather.time,
              weathercode: data.current_weather.weathercode
            } as CurrentWeather
        })
      );
  }
}
