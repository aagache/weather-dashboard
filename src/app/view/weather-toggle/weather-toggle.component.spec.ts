import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherToggleComponent } from './weather-toggle.component';

describe('WeatherToggleComponent', () => {
  let component: WeatherToggleComponent;
  let fixture: ComponentFixture<WeatherToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherToggleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
