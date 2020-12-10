import { FormGroup, ValidatorFn } from '@angular/forms';

export function validateConfirmPassword(form: FormGroup): ValidatorFn {
  var password = form.get('password');
  var confirmPassword = form.get('confirmPassword');

  return (): { [key: string]: any } | null =>
    password && confirmPassword && password.value === confirmPassword.value
      ? null : { confirmPassword: true };
}