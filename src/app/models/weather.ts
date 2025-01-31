export interface WeatherType {
  current_weather: string;
  latitude: number;
  longitude: number;
}

export interface CurrentWeather {
  temperature: number;
  time: string;
  weathercode: number;
}
