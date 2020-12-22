import { FormGroup, ValidatorFn } from '@angular/forms';

export function validateConfirmPassword(): ValidatorFn {
  return (formGroup: FormGroup) => {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    if (password && confirmPassword && password.value && confirmPassword.value && password.value !== confirmPassword.value) {
      return { passwordsMatch: true };
    }

    return null;
  };
}
