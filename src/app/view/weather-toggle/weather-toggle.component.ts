import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'weather-toggle',
  standalone: true,
  imports: [
    CommonModule,
    MatSlideToggleModule,
    FormsModule
  ],
  templateUrl: './weather-toggle.component.html',
  styleUrl: './weather-toggle.component.scss'
})
export class WeatherToggleComponent {
  @Input() temperatureCelsius: number = 0;
  isCelsius: boolean = true;

  setTemperatureUnit(unit: 'C' | 'F'): void {
    this.isCelsius = (unit === 'C');
    this.getCurrentTemperature();
  }

  getCurrentTemperature() {
    if (this.isCelsius) {
      return this.temperatureCelsius;
    } else {
      return (this.temperatureCelsius * 9 / 5) + 32;
    }
  }
}
