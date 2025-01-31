import { TestBed } from '@angular/core/testing';
import { WeatherService } from './weather.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import { CurrentWeather } from '../../models/weather';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService],
    });
    
    service = TestBed.inject(WeatherService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch current weather for given coordinates', () => {
    const lat = 40.123;
    const lon = -40.456;
    const unit = 'celsius';

    const mockApiResponse = {
      current: {
        temperature_2m: 25.3,
        time: '2025-01-31T14:00:00Z',
        weather_code: 2,
        wind_speed_10m: 10,
        relative_humidity_2m: 55,
      },
    };

    const expectedWeather: CurrentWeather = {
      temperature: mockApiResponse.current.temperature_2m,
      time: mockApiResponse.current.time,
      weathercode: mockApiResponse.current.weather_code,
      windspeed: mockApiResponse.current.wind_speed_10m,
      humidity: mockApiResponse.current.relative_humidity_2m,
    };

    service.getCurrentWeather(lat, lon).subscribe((weather) => {
      expect(weather).toEqual(expectedWeather);
    });

    const req = httpTestingController.expectOne(
      `${environment.weatherApi}forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
    );

    req.flush(mockApiResponse);
  });
});
