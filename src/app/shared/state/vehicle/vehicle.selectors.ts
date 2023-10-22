// vehicle.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VehicleState } from './vehicle.state';

const getVehicleState = createFeatureSelector<VehicleState>('vehicle');

export const getSelectedVehicleType = createSelector(
  getVehicleState,
  (state) => state.selectedVehicleType
);

export const getSelectedVehicleSubtype = createSelector(
  getVehicleState,
  (state) => state.selectedVehicleSubtype
);

export const getSelectedVehicleImage = createSelector(
    getVehicleState,
    (state) => state.selectedVehicleImage
  );

export const getAllVehicleTypes = createSelector(getVehicleState, (state) => state.vehicleData);
