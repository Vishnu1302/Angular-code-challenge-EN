import { createAction, props } from '@ngrx/store';
import { VehicleType } from './vehicle.state';

// Load vehicle data
export const loadVehicleData = createAction('[Vehicle] Load Vehicle Data');

// Set vehicle data in a single action
export const setVehicleDetails = createAction(
  '[Vehicle] Set Vehicle Details',
  props<{ data: VehicleType[] }>()
);

// set vehicle type. Used for updating subtypes
export const setSelectedVehicleType = createAction(
  '[Vehicle] Set Selected Vehicle Type',
  props<{ selectedVehicleType: VehicleType }>()
);
