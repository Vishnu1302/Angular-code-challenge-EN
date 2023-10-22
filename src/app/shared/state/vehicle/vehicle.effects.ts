import { Injectable } from '@angular/core';
import { VehicleService } from '../../../services/vehicle.service';
import * as VehicleActions from './vehicle.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class VehicleEffects {
  constructor(private actions$: Actions, private vehicleService: VehicleService) {}

  loadVehicleData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VehicleActions.loadVehicleData),
      mergeMap(() =>
        this.vehicleService.getVehicleData().pipe(
          map((data) => VehicleActions.setVehicleData({ data })),
          catchError(() => of({ type: 'Error Handling Action' }))
        )
      )
    )
  );
}
