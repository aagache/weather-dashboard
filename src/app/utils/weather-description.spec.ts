import { translateWeatherCode } from "./weather-description";

describe('translateWeatherCode', () => {
  it('should return Clear sky for code 0', () => {
    const result = translateWeatherCode(0);
    expect(result).toEqual({ condition: 'Clear sky', icon: '☀️' });
  });

  it('should return Partly cloudy for code 2', () => {
    const result = translateWeatherCode(2);
    expect(result).toEqual({ condition: 'Partly cloudy', icon: '⛅️' });
  });

  it('should return Fog for code 45', () => {
    const result = translateWeatherCode(45);
    expect(result).toEqual({ condition: 'Fog', icon: '🌫️' });
  });

  it('should return Drizzle for code 53', () => {
    const result = translateWeatherCode(53);
    expect(result).toEqual({ condition: 'Drizzle', icon: '🌧️' });
  });

  it('should return Rain for code 62', () => {
    const result = translateWeatherCode(62);
    expect(result).toEqual({ condition: 'Rain', icon: '🌧️' });
  });

  it('should return Snowfall for code 73', () => {
    const result = translateWeatherCode(73);
    expect(result).toEqual({ condition: 'Snowfall', icon: '❄️' });
  });

  it('should return Showers for code 81', () => {
    const result = translateWeatherCode(81);
    expect(result).toEqual({ condition: 'Showers', icon: '🌦️' });
  });

  it('should return Thunderstorm for code 96', () => {
    const result = translateWeatherCode(96);
    expect(result).toEqual({ condition: 'Thunderstorm', icon: '⛈️' });
  });

  it('should return Unknown weather for an undefined code', () => {
    const result = translateWeatherCode(999);
    expect(result).toEqual({ condition: 'Unknown weather', icon: '🌪️' });
  });
});
