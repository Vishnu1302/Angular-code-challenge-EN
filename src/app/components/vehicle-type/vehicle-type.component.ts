import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loadVehicleData, setSelectedVehicleType, setSelectedVehicleSubtype, setSelectedVehicleImage } from '../../shared/state/vehicle/vehicle.actions';
import {
  getSelectedVehicleType,
  getSelectedVehicleSubtype,
  getAllVehicleTypes,
  getSelectedVehicleImage,
} from '../../shared/state/vehicle/vehicle.selectors';
import { LicensePlateValidator } from 'src/app/shared/custom-validators/license-plate.validator';
import { VehicleType } from 'src/app/shared/state/vehicle/vehicle.state';

@Component({
  selector: 'app-vehicle-type',
  templateUrl: './vehicle-type.component.html',
  styleUrls: ['./vehicle-type.component.css'],
})
export class VehicleTypeComponent implements OnInit {
  vehicleInfoForm: FormGroup;
  vehicleData: VehicleType[] = [];
  vehicleSubtypes: string[] = []; // Add this property
  vehicleImage: string | undefined;

  constructor(private fb: FormBuilder, private store: Store) {
    this.vehicleInfoForm = this.fb.group({
      vehicleType: ['', Validators.required],
      vehicleSubtype: [''],
      licensePlate: [
        '',
        { validators: [Validators.required, LicensePlateValidator, Validators.pattern(/^([A-Z]{2}-\d{2}-[A-Z]{2})$/)], updateOn: 'blur' },
      ],
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadVehicleData());

    this.store.select(getSelectedVehicleType).subscribe((type) => {
      this.vehicleInfoForm.get('vehicleType')?.setValue(type);
      this.updateSubtypes(); // Update subtypes when type changes
    });

    this.store.select(getSelectedVehicleSubtype).subscribe((subtype) => {
      this.vehicleInfoForm.get('vehicleSubtype')?.setValue(subtype);
    });

    this.store.select(getSelectedVehicleImage).subscribe((image) => {
      this.vehicleImage = image;
    });

    this.store.select(getAllVehicleTypes).subscribe((data) => {
      this.vehicleData = data;
      this.updateSubtypes(); // Update subtypes when data changes
    });

    if (this.vehicleData && this.vehicleData.length > 0) {
      // this.vehicleInfoForm.get('vehicleType')?.setValue(this.vehicleData[0].name);
      // this.vehicleInfoForm.get('vehicleSubtype')?.setValue(this.vehicleData[0].subtypes[0].name);

      this.store.dispatch(setSelectedVehicleType({ selectedVehicleType: this.vehicleData[0].name }));
      this.store.dispatch(setSelectedVehicleImage({ selectedVehicleImage: this.vehicleData[0].image }));
      this.store.dispatch(setSelectedVehicleSubtype({ selectedVehicleSubtype: this.vehicleData[0].subtypes[0]?.name }));
    }
  }

  onVehicleTypeChange(event: Event): void {
    const newType = (event.target as HTMLSelectElement).value;
    const image = this.vehicleData
      .filter(x => x.name === newType)
      .map(x => x.image)
      .find(Boolean);
    this.store.dispatch(setSelectedVehicleType({ selectedVehicleType: newType }));
    if (image) {
      this.store.dispatch(setSelectedVehicleImage({ selectedVehicleImage: image }));
    }
  }

  // Update subtypes based on the selected vehicle type
  updateSubtypes(): void {
    const selectedType = this.vehicleInfoForm.get('vehicleType')?.value;
    const vehicle = this.vehicleData.find((data) => data.name === selectedType);
    //istanbul ignore else
    if (vehicle) {
      this.vehicleSubtypes = vehicle.subtypes.map((subtype) => subtype.name);
    } else {
      this.vehicleSubtypes = [];
    }
  }

  onLicensePlateChange(event: Event): void {
    let value = (event.target as HTMLSelectElement).value;
    value = value.replace(/[-\s]/g, '');
    if (value.length === 6) {
      value = value.substring(0, 2) + '-' + value.substring(2, 4) + '-' + value.substring(4, 6);
    } else if (value.length === 7) {
      value = value.substring(0, 2) + '-' + value.substring(2, 4) + '-' + value.substring(4, 7);
    }
    this.vehicleInfoForm.get('licensePlate')?.setValue(value);
  }

  //istanbul ignore next
  submitForm(): void {
    if (this.vehicleInfoForm.valid) {
      console.log(this.vehicleInfoForm.value);
    } else {
      // Handle validation errors
    }
  }
}
