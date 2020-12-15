import { FormGroup, ValidatorFn } from '@angular/forms';

export function validateConfirmPassword(form: FormGroup): ValidatorFn {
  const password = form.get('password');
  const confirmPassword = form.get('confirmPassword');

  console.log(password);
  console.log(confirmPassword);

  return (): { [key: string]: any } | null =>
    password && confirmPassword && password.value === confirmPassword.value
      ? null : { confirmPassword: true };
}