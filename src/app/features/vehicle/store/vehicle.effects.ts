import { Injectable } from '@angular/core';
import { VehicleService } from '../services/vehicle.service';
import * as VehicleActions from './vehicle.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class VehicleEffects {
  constructor(private actions$: Actions, private vehicleService: VehicleService) {}

  loadVehicleData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VehicleActions.loadVehicleData),
      exhaustMap(() =>
        this.vehicleService.getVehicleData().pipe(
          map((data) => VehicleActions.setVehicleDetails({ data })),
          catchError(() => of({ type: 'Error Handling Action' }))
        )
      )
    )
  );
}
