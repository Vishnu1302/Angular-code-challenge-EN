import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { VehicleType } from '../store/vehicle.state';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  getVehicleData(): Observable<VehicleType[]> {
    // Simulate data retrieval
    const vehicleData: VehicleType[] = [
      {
        name: 'Auto',
        subtypes: [
          { name: 'Hatchback' },
          { name: 'Sedan' },
          { name: 'Station' },
          { name: 'Cabriolet' },
          { name: 'Coupé' },
          { name: 'Multi Purpose Vehicle (MVP)' },
          { name: 'Terreinauto' },
        ],
        image: 'auto.jpg'
      },
      {
        name: 'Motor',
        subtypes: [
          { name: 'All-road' },
          { name: 'Naked' },
          { name: 'Enduro' },
          { name: 'Race' },
          { name: 'Toermotor' },
          { name: 'Chopper' },
          { name: 'Zijspan' },
        ],
        image: 'motor.jpg'
      },
      {
        name: 'Scooter',
        subtypes: [],
        image: 'scooter.jpg'
      },
    ];
    console.log('you are done');
    return of(vehicleData);
  }
}
