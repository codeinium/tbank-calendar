import { AbstractControl, ValidationErrors } from "@angular/forms";

export function phoneValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  if (!value) {
    return null;
  }

  const digits = String(value).replace(/\D/g, '');

  if (digits.length !== 11) {
    return { phoneLength: true };
  }

  if (!digits.startsWith('7')) {
    return { phoneFormat: true };
  }

  return null;
}

export function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');

  return `+${digits}`;
}
