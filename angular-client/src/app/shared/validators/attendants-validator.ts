import { FormGroup, ValidatorFn } from '@angular/forms';

export function validateAttendants(minimum: number): ValidatorFn {
  return (formGroup: FormGroup) => {
    const attendantList = formGroup.get('attendantList').value;

    console.log(attendantList);

    if (attendantList && attendantList.length < minimum) {
      return { attendants: 'Minimum ' + minimum + ' attendant required besides the organisator' };
    }

    return null;
  };
}
