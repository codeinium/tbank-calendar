import { FormControl, FormGroup } from '@angular/forms';
import { passwordMatchValidator } from './password.validator';

describe('passwordMatchValidator', () => {
  it('should return null when passwords match', () => {
    const group = new FormGroup({
      newPassword: new FormControl('secret123'),
      confirmPassword: new FormControl('secret123'),
    });

    expect(passwordMatchValidator(group)).toBeNull();
  });

  it('should return mismatch error when passwords differ', () => {
    const group = new FormGroup({
      newPassword: new FormControl('secret123'),
      confirmPassword: new FormControl('different'),
    });

    expect(passwordMatchValidator(group)).toEqual({ mismatch: true });
  });

  it('should return null when confirmPassword is empty', () => {
    const group = new FormGroup({
      newPassword: new FormControl('secret123'),
      confirmPassword: new FormControl(''),
    });

    expect(passwordMatchValidator(group)).toBeNull();
  });

  it('should return null when both fields are empty', () => {
    const group = new FormGroup({
      newPassword: new FormControl(''),
      confirmPassword: new FormControl(''),
    });

    expect(passwordMatchValidator(group)).toBeNull();
  });

  it('should not fail when controls are missing', () => {
    const group = new FormGroup({});

    expect(passwordMatchValidator(group)).toBeNull();
  });
});
