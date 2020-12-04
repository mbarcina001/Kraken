import { createSelector } from '@ngrx/store';
import { MeetingState } from '../reducers/meeting.reducer';

export const selectMeetings = createSelector(
    // tslint:disable-next-line: no-string-literal
    (state: any) => state.meeting,
    (meeting: MeetingState) => meeting.meetings
);

export const selectMeetingsLoading = createSelector(
    // tslint:disable-next-line: no-string-literal
    (state: any) => state.meeting,
    (meeting: MeetingState) => meeting.loading
);

export const selectMeetingsError = createSelector(
    // tslint:disable-next-line: no-string-literal
    (state: any) => state.meeting,
    (meeting: MeetingState) => meeting.error
);
