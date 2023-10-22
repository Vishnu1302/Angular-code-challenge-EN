import { AbstractControl, ValidationErrors } from '@angular/forms';
import { KentekenCheck } from 'rdw-kenteken-check';

export function LicensePlateValidator(control: AbstractControl): ValidationErrors | null {
    const licensePlate = control.value;

    if (licensePlate) {
        // Check if the license plate is valid using the rdw-kenteken-check library
        const kentekenCheck = new KentekenCheck(licensePlate);
        if (kentekenCheck) {
            return { invalidLicensePlate: !kentekenCheck.valid };
        }
    }

    return null;
}
