import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LocationType } from '../../models/location';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) {}

  public getLocation(place: string): Observable<LocationType[]> {
    return this.http.get<any[]>(`${environment.locationApi}search?q=${place}&format=json`);
  }
}
