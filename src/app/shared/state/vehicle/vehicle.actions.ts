import { createAction, props } from '@ngrx/store';
import { VehicleType } from './vehicle.state';

// Load vehicle data
export const loadVehicleData = createAction('[Vehicle] Load Vehicle Data');

// Set vehicle data
export const setVehicleData = createAction(
  '[Vehicle] Set Vehicle Data',
  props<{ data: VehicleType[] }>()
);

// Set selected vehicle type
export const setSelectedVehicleType = createAction(
  '[Vehicle] Set Selected Vehicle Type',
  props<{ selectedVehicleType: string }>()
);

// Set selected vehicle image
export const setSelectedVehicleImage = createAction(
    '[Vehicle] Set Selected Vehicle Image',
    props<{ selectedVehicleImage: string }>()
  );

// Set selected vehicle subtype
export const setSelectedVehicleSubtype = createAction(
  '[Vehicle] Set Selected Vehicle Subtype',
  props<{ selectedVehicleSubtype: string }>()
);
