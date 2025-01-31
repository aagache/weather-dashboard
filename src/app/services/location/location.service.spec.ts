import { TestBed } from '@angular/core/testing';
import { LocationService } from './location.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LocationType } from '../../models/location';
import { environment } from '../../../../environments/environment';

describe('LocationService', () => {
  let service: LocationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LocationService],
    });
    
    service = TestBed.inject(LocationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch location data for a given place', (done: DoneFn) => {
    const place = 'Oradea';

    const mockLocation: LocationType[] = [{
      display_name: 'Oradea, Romania',
      lat: 40.123, 
      lon: -40.456,
    }];

    service.getLocation(place).subscribe(data => { 
      expect(mockLocation).toEqual(data);
      done();
     });

     const req = httpTestingController.expectOne(
      `${environment.locationApi}search?q=${place}&format=json`
    );
  
    req.flush(mockLocation);
  });

  it('should set the location', (done) => {
    let result: LocationType | null = null;

    const mockLocation: LocationType = {
      display_name: 'Oradea, Romania',
      lat: 40.123, 
      lon: -40.456,
    };

    service.setLocation(mockLocation);
    service.selectedLocation.subscribe(data => {
      result = data
    
      expect(result).toEqual(mockLocation);
      done();
    });
  });
});
