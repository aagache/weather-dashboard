import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocationService } from './services/location/location.service';
import { WeatherService } from './services/weather/weather.service';
import { DashboardComponent } from './view/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'weather-dashboard';

  constructor(
    private locationService: LocationService,
    private weatherService: WeatherService
  ) {}

  /**
   * just for testing purposes
   */
  ngOnInit(): void {
    this.locationService.getLocation('London').subscribe((data: any) => {
      console.log('1', data)

      this.weatherService.getCurrentWeather(data[0].lat, data[0].lon).subscribe(data => {
        console.log('2', data)
      })
    })

  }
}
