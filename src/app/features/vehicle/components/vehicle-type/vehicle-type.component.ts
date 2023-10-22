import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loadVehicleData, setSelectedVehicleType } from '../../store/vehicle.actions';
import {
  getSelectedVehicleType,
  getAllVehicleTypes,
} from '../../store/vehicle.selectors';
import { LicensePlateValidator } from '../../../../shared/custom-validators';
import { VehicleSubtype, VehicleType } from '../../store/vehicle.state';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-vehicle-type',
  templateUrl: './vehicle-type.component.html',
  styleUrls: ['./vehicle-type.component.css'],
})
export class VehicleTypeComponent implements OnInit, OnDestroy {
  vehicleInfoForm: FormGroup;
  vehicleData: VehicleType[] = [];
  vehicleSubtypes: VehicleSubtype[] = []; // Add this property
  vehicleImage: string | undefined;
  private destroy$: Subject<void> = new Subject<void>();

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

    this.store
      .select(getSelectedVehicleType)
      .pipe(takeUntil(this.destroy$))
      .subscribe((type: VehicleType) => {
        this.vehicleInfoForm.get('vehicleType')?.setValue(type.name);
        this.updateForm(); // Update subtypes when type changes
      });

    // Initial loading of values in the form
    this.store
      .select(getAllVehicleTypes)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.vehicleData = data;
        this.vehicleInfoForm.get('vehicleType')?.setValue(this.vehicleData[0].name);
        this.updateForm();
      });

  }

  onVehicleTypeChange(event: Event): void {
    const newType = (event.target as HTMLSelectElement).value;
    const newVehicleData = this.vehicleData.find(x => x.name === newType);
    if (newVehicleData) {
      this.store.dispatch(setSelectedVehicleType({ selectedVehicleType: newVehicleData }))
    }
  }

  // Update subtypes and image based on the selected vehicle type
  updateForm(): void {
    const selectedType = this.vehicleInfoForm.get('vehicleType')?.value;
    const vehicle = this.vehicleData.find((data) => data.name === selectedType);
    //istanbul ignore else
    if (vehicle) {
      this.vehicleSubtypes = vehicle.subtypes;
      this.vehicleImage = vehicle.image
    } else {
      this.vehicleSubtypes = [];
    }
  }

  onLicensePlateChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    const formattedValue = value.replace(/[-\s]/g, ''); // Remove existing dashes or spaces

    // Check if the formatted value contains a letter combination of 4 characters
    if (/^[A-Z]{2}\d{2}[A-Z]{2}$/.test(formattedValue)) {
      const firstPart = formattedValue.substring(0, 2);
      const secondPart = formattedValue.substring(2, 4);
      const thirdPart = formattedValue.substring(4, 6);
      this.vehicleInfoForm.get('licensePlate')?.setValue(`${firstPart}-${secondPart}-${thirdPart}`);
    } else {
      // For other cases, insert dashes after every 2 characters
      const formatted = formattedValue.match(/.{1,2}/g);
      if (formatted) {
        this.vehicleInfoForm.get('licensePlate')?.setValue(formatted.join('-'));
      }
    }
  }


  //istanbul ignore next
  submitForm(): void {
    if (this.vehicleInfoForm.valid) {
      console.log(this.vehicleInfoForm.value);
    } else {
      // Handle validation errors
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
