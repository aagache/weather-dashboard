import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocationService } from './services/location/location.service';
import { WeatherService } from './services/weather/weather.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'weather-dashboard';
  location: any;

  constructor(
    private locationService: LocationService,
    private weatherService: WeatherService
  ) {}

  /**
   * just for testing purposes
   */
  ngOnInit(): void {
    this.locationService.getLocation('London').subscribe((data: any) => {
      this.location = data;
      console.log('1', data)

      this.weatherService.getCurrentWeather(data[0].lat, data[0].lon).subscribe(data => {
        console.log('2', data)
      })
    })

  }
}
