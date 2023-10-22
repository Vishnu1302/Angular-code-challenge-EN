import { createReducer, on } from '@ngrx/store';
import { VehicleState } from './vehicle.state';
import * as VehicleActions from './vehicle.actions';

export const initialState: VehicleState = {
  vehicleData: [],
  selectedVehicleType: {
    name: '',
    subtypes: [],
    image: ''
  }
};

const _vehicleReducer = createReducer(
  initialState,
  on(VehicleActions.setVehicleDetails, (state, { data }) => ({
    ...state,
    vehicleData: data,
  })),
  on(VehicleActions.setSelectedVehicleType, (state, { selectedVehicleType }) => ({
    ...state,
    selectedVehicleType: selectedVehicleType
  })), 
);

export function vehicleReducer(state: VehicleState | undefined, action: any) {
  return _vehicleReducer(state, action);
}
