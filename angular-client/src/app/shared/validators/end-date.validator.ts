import { FormGroup, ValidatorFn } from '@angular/forms';

export function validateEndDate(): ValidatorFn {
  return (formGroup: FormGroup) => {
    console.log(formGroup);
    const startDate = formGroup.get('meetingStartDate');
    const endDate = formGroup.get('meetingEndDate');

    if (!startDate || !startDate.value || !endDate || !endDate.value) {
        return null;
    }

    const startDateVal = formGroup.get('meetingStartDate').value;
    const endDateVal = formGroup.get('meetingEndDate').value;

    if (startDateVal.dayOfYear() !== endDateVal.dayOfYear()) {
        return { endDate: 'Meeting must start and finish at the same day' };
    }

    if (startDateVal.hour() > endDateVal.hour()) {
        return { endDate: 'Meeting end date is before meeting start date ' };
    }

    if (startDateVal.hour() === endDateVal.hour() && startDateVal.minute() === endDateVal.minute()) {
        return { endDate: 'Meeting can\'t last 0 mins' };
    }

    if (startDateVal.hour() === endDateVal.hour() && startDateVal.minute() > endDateVal.minute()) {
        return { endDate: 'Meeting end date is before meeting start date ' };
    }

    return null;
  };
}
