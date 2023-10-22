import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { VehicleTypeComponent } from './vehicle-type.component';
import { loadVehicleData, setSelectedVehicleType } from '../../store/vehicle.actions';
import { VehicleService } from '../../services/vehicle.service';
import { of } from 'rxjs';
import { getAllVehicleTypes, getSelectedVehicleType } from '../../store/vehicle.selectors';

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
    store.overrideSelector(getSelectedVehicleType, mockVehicleData[0]);
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
    const setSelectedVehicleTypeAction = setSelectedVehicleType({ selectedVehicleType: mockVehicleData[0] });
    component.vehicleData = mockVehicleData;
    spyOn(store, 'dispatch');

    const event = { target: { value: newType } } as unknown as Event;
    component.onVehicleTypeChange(event);

    expect(store.dispatch).toHaveBeenCalledWith(setSelectedVehicleTypeAction);
  });

  it('should update subtypes when updateForm is called', () => {
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

    component.updateForm();

    expect(component.vehicleSubtypes).toEqual([{name:'Sport'}, {name:'Touring'}]);
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

  it('should handle onLicensePlateChange with length 6', () => {
    const event = { target: { value: 'ABCDEF' } } as unknown as Event;
    component.onLicensePlateChange(event);

    expect(component.vehicleInfoForm.get('licensePlate')?.value).toEqual('AB-CD-EF');
  });

  it('should handle onLicensePlateChange with length 7', () => {
    const event = { target: { value: 'ABCDEFGH' } } as unknown as Event;
    component.onLicensePlateChange(event);

    expect(component.vehicleInfoForm.get('licensePlate')?.value).toEqual('AB-CD-EF-GH');
  });
});
