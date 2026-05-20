import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const newPass = control.get('newPassword');
  const confirmPass = control.get('confirmPassword');

  if (newPass?.value && confirmPass?.value && newPass.value !== confirmPass.value) {
    return { mismatch: true };
  }
  return null;
};
