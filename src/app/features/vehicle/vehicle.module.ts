import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleRoutingModule } from './vehicle-routing.module';
import { StoreModule } from '@ngrx/store';
import { vehicleReducer } from './store/vehicle.reducer';
import { VehicleEffects } from './store/vehicle.effects';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { VehicleImageComponent, VehicleTypeComponent } from './components';

@NgModule({
  declarations: [ VehicleImageComponent, VehicleTypeComponent ],
  imports: [
    CommonModule, VehicleRoutingModule, ReactiveFormsModule,
    StoreModule.forFeature('vehicle', vehicleReducer),
    EffectsModule.forFeature([VehicleEffects])
  ]
})
export class VehicleModule { }
