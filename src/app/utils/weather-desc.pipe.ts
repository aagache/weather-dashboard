import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weatherDescription'
})
export class WeatherDescriptionPipe implements PipeTransform {
  transform(code: number): string {
    switch (true) {
      case code === 0:
        return 'Clear sky ☀️';
      case code >= 1 && code <= 3:
        return 'Partly cloudy ⛅️';
      case code === 45 || code === 48:
        return 'Fog 🌫️';
      case code >=51 && code <= 57:
        return 'Drizzle 🌧️';
      case code >= 61 && code <= 67:
        return 'Rain 🌧️';
      case code >= 71 && code <= 77:
        return 'Snowfall ❄️';
      case code >= 80 && code <= 82:
        return 'Showers 🌦️';
      case code >= 95 && code <= 99:
        return 'Thunderstorm ⛈️';
      default:
        return 'Unknown weather 🌪️';
    }
  }
}
