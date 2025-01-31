import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocationService } from './services/location/location.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'weather-dashboard';

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.locationService.getLocation('London').subscribe(data => {
      console.log(data)
    })
  }
}
