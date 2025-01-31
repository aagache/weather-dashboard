import { Component, OnInit } from '@angular/core';
import { debounceTime, map, Observable, of, startWith, switchMap } from 'rxjs';
import { LocationType } from '../../models/location';
import { LocationService } from '../../services/location/location.service';
import { FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'weather-search',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatListModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  searchField = new FormControl();
  foundLocations: Observable<LocationType[]>;
  noResults = false;

  constructor(private locationService: LocationService) {
    this.foundLocations = of([]);
  }

  ngOnInit(): void {
    this.foundLocations = this.searchField.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => value ? this.searchCities(value) : [])
    );
  }

  searchCities(place: string): Observable<LocationType[]> {
    this.noResults = false;

    return this.locationService.getLocation(place).pipe(
      map((locations: LocationType[]) => {
        console.log('found', locations)
        this.noResults = locations.length === 0;
        return locations;
      })
    );
  }
}
