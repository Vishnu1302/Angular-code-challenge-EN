import { createReducer, on } from '@ngrx/store';
import { VehicleState } from './vehicle.state';
import * as VehicleActions from './vehicle.actions';

export const initialState: VehicleState = {
  vehicleData: [],
  selectedVehicleType: '',
  selectedVehicleSubtype: '',
  selectedVehicleImage: ''
};

const _vehicleReducer = createReducer(
  initialState,
  on(VehicleActions.setVehicleData, (state, { data }) => ({
    ...state,
    vehicleData: data,
  })),
  on(VehicleActions.setSelectedVehicleType, (state, { selectedVehicleType }) => ({
    ...state,
    selectedVehicleType,
    selectedVehicleSubtype: state.vehicleData.find(
      (type) => type.name === selectedVehicleType
    )?.subtypes[0]?.name || '',
  })),
  on(VehicleActions.setSelectedVehicleImage, (state, { selectedVehicleImage }) => ({
    ...state,
    selectedVehicleImage,
  })),
  on(VehicleActions.setSelectedVehicleSubtype, (state, { selectedVehicleSubtype }) => ({
    ...state,
    selectedVehicleSubtype,
  }),
  
));

export function vehicleReducer(state: VehicleState | undefined, action: any) {
  return _vehicleReducer(state, action);
}
