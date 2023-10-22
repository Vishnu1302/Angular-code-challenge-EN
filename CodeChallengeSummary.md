# Split Angular Components (Below is updated project structure)
 app/
|-- app.component.ts
|-- app.module.ts
|-- app.routing.module.ts
|-- feature/
|   |-- vehicle/
|       |-- vehicle.module.ts
|       |-- vehicle.routing.module.ts
|       |-- components/
|       |   |-- vehicle-type.component.ts
|       |   |-- vehicle-image.component.ts
|       |-- services/
|       |   |-- vehicle.service.ts
|       |-- store/
|       |   |-- vehicle.actions.ts
|       |   |-- vehicle.reducer.ts
|       |   |-- vehicle.selectors.ts
|       |   |-- vehicle.effects.ts
|   |-- shared/
|       |-- custom-validators/
|       |   |-- license-plate.validators.ts

 # Reactive forms
 The vehicle-type component uses reactive forms and uses form builder and groups to create form

 # NGRX
 NGRX is utilized for efficient state management. In the vehicle-type component, during initialization, an action named loadVehicleData is dispatched. Subsequently, an effect is triggered, invoking a call to the vehicle service for data retrieval.

Once the data retrieval from the service is successful, the effect invokes setVehicleData. As a result, the form components are populated based on the actions triggered. This process is facilitated through the use of reducers and selectors, ensuring a smooth and streamlined data flow within the application.

 # Unit testing
 Covered the unit tests for
    components
        -vehicle-type
        -vehicle-image
    service
        -vehicle-service

# E2E testing
Added cypress and other required packages to run e2e tests
Below are the steps to run E2E tests
    1. ng build
    2. npm run ci:start-server
    3. Now in browser open http://localhost:4200/
    4. npm run cypress:open