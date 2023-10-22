import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { VehicleTypeComponent } from './components/vehicle-type/vehicle-type.component';
import { VehicleImageComponent } from './components/vehicle-image/vehicle-image.component';
import { EffectsModule } from '@ngrx/effects';
import { vehicleReducer } from './shared/state/vehicle/vehicle.reducer';
import { VehicleEffects } from './shared/state/vehicle/vehicle.effects';

@NgModule({
  declarations: [
    AppComponent,
    VehicleTypeComponent,
    VehicleImageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ vehicle: vehicleReducer }), // Provide the main app reducer
    EffectsModule.forRoot([VehicleEffects]), // Provide the main app effects
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
