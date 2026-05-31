import { FormControl } from '@angular/forms';
import { phoneValidator, normalizePhone } from './phone.validator';

describe('phoneValidator', () => {
  it('should return null for valid 11-digit phone starting with 7', () => {
    const control = new FormControl('+71112223344');
    expect(phoneValidator(control)).toBeNull();
  });

  it('should return null for empty value', () => {
    const control = new FormControl('');
    expect(phoneValidator(control)).toBeNull();
  });

  it('should return null for null value', () => {
    const control = new FormControl(null);
    expect(phoneValidator(control)).toBeNull();
  });

  it('should return phoneLength error for less than 11 digits', () => {
    const control = new FormControl('+7111222');
    expect(phoneValidator(control)).toEqual({ phoneLength: true });
  });

  it('should return phoneFormat error when not starting with 7', () => {
    const control = new FormControl('+89998887766');
    expect(phoneValidator(control)).toEqual({ phoneFormat: true });
  });
});

describe('normalizePhone', () => {
  it('should strip non-digits and prepend +', () => {
    expect(normalizePhone('+7 (111) 222-33-44')).toBe('+71112223344');
  });

  it('should handle raw digits', () => {
    expect(normalizePhone('71112223344')).toBe('+71112223344');
  });

  it('should handle empty string', () => {
    expect(normalizePhone('')).toBe('+');
  });
});
