import { FormGroup, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';

export function validateMeetingDates(): ValidatorFn {
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
        return { meetingDates: 'Meeting must start and finish at the same day' };
    }

    if (startDateVal.hour() > endDateVal.hour()) {
        return { meetingDates: 'Meeting end date is before meeting start date ' };
    }

    if (startDateVal.hour() === endDateVal.hour() && startDateVal.minute() > endDateVal.minute()) {
        return { meetingDates: 'Meeting end date is before meeting start date ' };
    }

    if (startDateVal.hour() === endDateVal.hour() && startDateVal.minute() === endDateVal.minute()) {
        return { meetingDates: 'Meeting can\'t last 0 mins' };
    }

    if (startDateVal.hour() < new Date().getHours()){
        return { meetingDates: 'Meeting start date is before current date' };
    }

    if (startDateVal.dayOfYear() < moment(new Date()).dayOfYear()) {
        return { meetingDates: 'Meeting start date is before current date' };
    }

    if (startDateVal.hour() === new Date().getHours() && startDateVal.minute() < new Date().getMinutes()) {
        return { meetingDates: 'Meeting start date is before current date' };
    }

    return null;
  };
}
