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
      current_weather: {
        temperature: 25.3,
        time: '2025-01-31T14:00:00Z',
        weathercode: 2,
      },
    };

    const expectedWeather: CurrentWeather = {
      ...mockApiResponse.current_weather
    };

    service.getCurrentWeather(lat, lon, unit).subscribe((weather) => {
      expect(weather).toEqual(expectedWeather);
    });

    const req = httpTestingController.expectOne(
      `${environment.weatherApi}forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=${unit}`
    );

    req.flush(mockApiResponse);
  });
});
