import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LocationService } from '../../services/location/location.service';
import { LocationType } from '../../models/location';
import { of } from 'rxjs';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockLocationService: jasmine.SpyObj<LocationService>;

  beforeEach(async () => {
    mockLocationService = jasmine.createSpyObj('LocationService', ['getLocation', 'setLocation']);

    await TestBed.configureTestingModule({
      imports: [SearchComponent, HttpClientTestingModule, NoopAnimationsModule],
      providers: [
        { provide: LocationService, useValue: mockLocationService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should search for a city', fakeAsync(() => {
    mockLocationService.getLocation.and.returnValue(of([
      { display_name: 'Iasi, Romania', lat: 40.123, lon: -40.456 },
    ]));

    component.searchField.setValue('Iasi');
    tick(300);
    fixture.detectChanges();

    component.foundLocations.subscribe(locations => {
      expect(locations).toEqual([]);
      expect(component.noResults).toBeTrue();
    });

    flush();
  }));

  it('should set the selected location when onLocationSelect is called', () => {
    const mockLocation: LocationType = {
      display_name: 'Bucharest, Romania',
      lat: 44.4268,
      lon: 26.1025
    };

    component.onLocationSelect(mockLocation);
    expect(mockLocationService.setLocation).toHaveBeenCalledWith(mockLocation);
  });
});
