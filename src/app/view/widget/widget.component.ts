import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location/location.service';
import { LocationType } from '../../models/location';
import { WeatherService } from '../../services/weather/weather.service';
import { CurrentWeather } from '../../models/weather';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'weather-widget',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule
  ],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.scss'
})
export class WidgetComponent implements OnInit {
  currentLocation: LocationType | null = null;
  loadingWeather: boolean = false;
  weatherData: CurrentWeather | null = null;
  error: string | null = null;
  
  constructor(
    private locationService: LocationService,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.locationService.currentLocation$.subscribe(location => {
      this.currentLocation = location;

      if (location) {
        this.getWeather(location.lat, location.lon);
        this.getLocation();
      }
    });
  }

  getWeather(lat: number, lon: number): void {
    this.loadingWeather = true;
    
    this.weatherService.getCurrentWeather(lat, lon).subscribe(
      data => {
        this.weatherData = data;
        this.loadingWeather = false;
      },
      err => {
        this.error = 'Failed to load weather data';
        this.loadingWeather = false;
      },
    );
  }

  getLocation(): string {
    const location = this.currentLocation!.display_name;
    const commaIndex = location.indexOf(',');
    
    return commaIndex !== -1 ? location.substring(0, commaIndex) : location;
  }
}
