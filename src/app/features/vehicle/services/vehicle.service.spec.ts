import { TestBed } from '@angular/core/testing';
import { VehicleService } from './vehicle.service';

describe('VehicleService', () => {
  let service: VehicleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return vehicle data', (done) => {
    service.getVehicleData().subscribe((data) => {
      expect(data).toBeTruthy();
      expect(data.length).toBe(3); // Ensure the data length matches your mock data
      done();
    });
  });
});
