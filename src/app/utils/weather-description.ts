export function translateWeatherCode(code: number): { condition: string, icon: string } {
  switch (true) {
    case code === 0:
      return { condition: 'Clear sky', icon: '☀️' };
    case code >= 1 && code <= 3:
      return { condition: 'Partly cloudy', icon: '⛅️' };
    case code === 45 || code === 48:
      return { condition: 'Fog', icon: '🌫️' };
    case code >= 51 && code <= 57:
      return { condition: 'Drizzle', icon: '🌧️' };
    case code >= 61 && code <= 67:
      return { condition: 'Rain', icon: '🌧️' };
    case code >= 71 && code <= 77:
      return { condition: 'Snowfall', icon: '❄️' };
    case code >= 80 && code <= 82:
      return { condition: 'Showers', icon: '🌦️' };
    case code >= 95 && code <= 99:
      return { condition: 'Thunderstorm', icon: '⛈️' };
    default:
      return { condition: 'Unknown weather', icon: '🌪️' };
  }  
}