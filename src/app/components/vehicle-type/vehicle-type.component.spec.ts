import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { VehicleTypeComponent } from './vehicle-type.component';
import { loadVehicleData, setSelectedVehicleType, setSelectedVehicleImage } from '../../shared/state/vehicle/vehicle.actions';
import { VehicleService } from 'src/app/services/vehicle.service';
import { of } from 'rxjs';
import { getAllVehicleTypes, getSelectedVehicleImage, getSelectedVehicleSubtype, getSelectedVehicleType } from 'src/app/shared/state/vehicle/vehicle.selectors';

describe('VehicleTypeComponent', () => {
  let component: VehicleTypeComponent;
  let fixture: ComponentFixture<VehicleTypeComponent>;
  let store: MockStore;
  let vehicleService: jasmine.SpyObj<VehicleService>;
  const mockVehicleData = [
    {
      name: 'Auto',
      subtypes: [
        { name: 'Hatchback' },
        { name: 'Sedan' },
      ],
      image: 'auto.jpg'
    },
  ];

  beforeEach(() => {
    vehicleService = jasmine.createSpyObj('VehicleService', ['getVehicleData']);
    vehicleService.getVehicleData.and.returnValue(of(mockVehicleData));
    TestBed.configureTestingModule({
      declarations: [VehicleTypeComponent],
      imports: [ReactiveFormsModule],
      providers: [provideMockStore({ initialState: {} }), VehicleService],
    });

    fixture = TestBed.createComponent(VehicleTypeComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    store.overrideSelector(getSelectedVehicleType, 'Auto');
    store.overrideSelector(getSelectedVehicleSubtype, 'Hatchback');
    store.overrideSelector(getSelectedVehicleImage, 'auto.jpg');
    store.overrideSelector(getAllVehicleTypes, mockVehicleData);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadVehicleData on initialization', () => {
    const loadVehicleDataAction = loadVehicleData();
    spyOn(store, 'dispatch');
    
    fixture.detectChanges();
  
    expect(store.dispatch).toHaveBeenCalledWith(loadVehicleDataAction);
  });
  

  it('should dispatch setSelectedVehicleType when onVehicleTypeChange is called', () => {
    const newType = 'Auto';
    const setSelectedVehicleTypeAction = setSelectedVehicleType({ selectedVehicleType: newType });
    spyOn(store, 'dispatch');

    const event = { target: { value: newType } } as unknown as Event;
    component.onVehicleTypeChange(event);

    expect(store.dispatch).toHaveBeenCalledWith(setSelectedVehicleTypeAction);
  });

  it('should update subtypes when updateSubtypes is called', () => {
    const newType = 'Motor';
    component.vehicleInfoForm.get('vehicleType')?.setValue(newType);
    component.vehicleData = [
      {
        name: 'Motor',
        subtypes: [
          { name: 'Sport' },
          { name: 'Touring' },
        ],
        image: 'motor.jpg'
      },
      {
        name: 'Auto',
        subtypes: [
          { name: 'Hatchback' },
          { name: 'Sedan' },
        ],
        image: 'auto.jpg'
      },
    ];

    component.updateSubtypes();

    expect(component.vehicleSubtypes).toEqual(['Sport', 'Touring']);
  });

  it('should format license plate with no spaces and dash', () => {
    const event = { target: { value: 'AB12CD' } } as unknown as Event;
    component.onLicensePlateChange(event);

    expect(component.vehicleInfoForm.get('licensePlate')?.value).toEqual('AB-12-CD');
  });

  it('should format license plate with spaces and no dash', () => {
    const event = { target: { value: 'AB 12 CD' } } as unknown as Event;
    component.onLicensePlateChange(event);

    expect(component.vehicleInfoForm.get('licensePlate')?.value).toEqual('AB-12-CD');
  });

  it('should format license plate with spaces and dash', () => {
    const event = { target: { value: 'AB-12-CD' } } as unknown as Event;
    component.onLicensePlateChange(event);

    expect(component.vehicleInfoForm.get('licensePlate')?.value).toEqual('AB-12-CD');
  });

  it('should not format empty license plate', () => {
    const event = { target: { value: '' } } as unknown as Event;
    component.onLicensePlateChange(event);

    expect(component.vehicleInfoForm.get('licensePlate')?.value).toEqual('');
  });

  it('should format license plate with extra characters', () => {
    const event = { target: { value: 'A B-1_2_C#D' } } as unknown as Event;
    component.onLicensePlateChange(event);

    expect(component.vehicleInfoForm.get('licensePlate')?.value).toEqual('AB1_2_C#D');
  });

  it('should handle onLicensePlateChange with length 6', () => {
    const event = { target: { value: 'ABCDEF' } } as unknown as Event;
    component.onLicensePlateChange(event);

    expect(component.vehicleInfoForm.get('licensePlate')?.value).toEqual('AB-CD-EF');
  });

  it('should handle onLicensePlateChange with length 7', () => {
    const event = { target: { value: 'ABCDEFGH' } } as unknown as Event;
    component.onLicensePlateChange(event);

    expect(component.vehicleInfoForm.get('licensePlate')?.value).toEqual('ABCDEFGH');
  });

  it('should dispatch setSelectedVehicleImage when onVehicleTypeChange is called', () => {
    const newType = 'Auto';
    component.vehicleData = mockVehicleData
    const setSelectedVehicleImageAction = setSelectedVehicleImage({ selectedVehicleImage: 'auto.jpg' });
    spyOn(store, 'dispatch');

    const event = { target: { value: newType } } as unknown as Event;
    component.onVehicleTypeChange(event);

    expect(store.dispatch).toHaveBeenCalledWith(setSelectedVehicleImageAction);
  });
});
