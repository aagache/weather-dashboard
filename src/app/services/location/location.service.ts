import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LocationType } from '../../models/location';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  selectedLocation = new BehaviorSubject<LocationType | null>(null);
  currentLocation$ = this.selectedLocation.asObservable();
  
  constructor(private http: HttpClient) {}

  getLocation(place: string): Observable<LocationType[]> {
    return this.http.get<any[]>(`${environment.locationApi}search?q=${place}&format=json`);
  }

  setLocation(location: LocationType): void {
    this.selectedLocation.next(location);
  }
}
