import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetComponent } from './widget.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LocationService } from '../../services/location/location.service';
import { WeatherService } from '../../services/weather/weather.service';
import { of, throwError } from 'rxjs';
import { CurrentWeather } from '../../models/weather';

describe('WidgetComponent', () => {
  let component: WidgetComponent;
  let fixture: ComponentFixture<WidgetComponent>;
  let mockLocationService: jasmine.SpyObj<LocationService>;
  let mockWeatherService: jasmine.SpyObj<WeatherService>;

  beforeEach(async () => {
    mockLocationService = jasmine.createSpyObj('LocationService', ['currentLocation$']);
    mockWeatherService = jasmine.createSpyObj('WeatherService', ['getCurrentWeather']);

    mockLocationService.currentLocation$ = of({
      lat: 40.28,
      lon: -74.60,
      display_name: 'New York, USA',
    });

    await TestBed.configureTestingModule({
      imports: [WidgetComponent, HttpClientTestingModule],
      providers: [
        { provide: LocationService, useValue: mockLocationService },
        { provide: WeatherService, useValue: mockWeatherService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return weather icon', () => {
    let result = component.getWeatherIcon(0);
    expect(result).toBe('☀️');
  });

  it('should return weather description', () => {
    let result = component.getWeatherDescription(0);
    expect(result).toBe('Clear sky');
  });

  it('should return the location before the first comma', () => {
    component.currentLocation = {
      display_name: 'Iasi, Romania',
      lat: 1,
      lon: 2,
    };

    expect(component.getLocation()).toBe('Iasi');
  });

  it('should return the same location if there is no comma', () => {
    component.currentLocation = {
      display_name: 'Iasi no comma here',
      lat: 1,
      lon: 2,
    };

    expect(component.getLocation()).toBe(component.currentLocation.display_name);
  });

  it('should call getWeather on ngOnInit when location is provided', () => {
    spyOn(component, 'getWeather');
    component.ngOnInit();

    expect(component.getWeather).toHaveBeenCalledWith(40.28, -74.60);
  });

  it('should set weatherData and update loadingWeather when getWeather succeeds', () => {
    const mockWeatherData: CurrentWeather = {
      temperature: 22,
      humidity: 50,
      windspeed: 5,
      weathercode: 0,
      time: new Date().toISOString(),
    };

    mockWeatherService.getCurrentWeather.and.returnValue(of(mockWeatherData));
    component.getWeather(40.28, -74.60);

    expect(component.loadingWeather).toBe(false);
    expect(component.weatherData).toEqual(mockWeatherData);
  });

  it('should handle error when getWeather fails', () => {
    mockWeatherService.getCurrentWeather.and.returnValue(throwError(() => new Error('Failed to load weather data')));
    component.getWeather(40.7128, -74.0060);

    expect(component.loadingWeather).toBe(false);
  });
});
