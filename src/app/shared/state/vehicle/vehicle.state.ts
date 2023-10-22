export interface VehicleSubtype {
    name: string;
  }
  
  export interface VehicleType {
    name: string;
    subtypes: VehicleSubtype[];
    image: string;
  }
  
  export interface VehicleState {
    vehicleData: VehicleType[];
    selectedVehicleType: string;
    selectedVehicleSubtype: string;
    selectedVehicleImage: string;
  }
  