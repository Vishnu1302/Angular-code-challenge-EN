import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-vehicle-image',
  templateUrl: './vehicle-image.component.html',
  styleUrls: ['./vehicle-image.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VehicleImageComponent {
  @Input() selectedVehicleImage:string | undefined;
}
