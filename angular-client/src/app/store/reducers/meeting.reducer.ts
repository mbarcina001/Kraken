import {Action, createReducer, on } from '@ngrx/store';

import * as MeetingActions from '../actions/meeting.actions';
import { Meeting } from '../models/meeting.model';

export interface MeetingState {
    loading: boolean;
    meeting: Meeting;
    meetings: Meeting[];
    error: string;
}

export const initialState: MeetingState = {
    loading: false,
    meeting: null,
    meetings: [],
    error: '',
};

const reducer = createReducer(
    initialState,
    on(MeetingActions.getUserMeetings, (state) => ({ ...state, loading: true, error: ''})),
    on(MeetingActions.getUserMeetingsSuccess, (state, { meetings }) => ({ ...state, loading: false, meetings })),
    on(MeetingActions.getUserMeetingsError, (state, { error }) => ({ ...state, loading: false, error })),
    on(MeetingActions.createMeeting, (state, { meeting }) => ({ ...state, meeting, loading: true, error: ''})),
    on(MeetingActions.createMeetingSuccess, (state) => ({ ...state, loading: false })),
    on(MeetingActions.createMeetingError, (state, { error }) => ({ ...state, loading: false, error })),
    on(MeetingActions.editMeeting, (state, { meeting }) => ({ ...state, meeting, loading: true, error: ''})),
    on(MeetingActions.editMeetingSuccess, (state) => ({ ...state, loading: false })),
    on(MeetingActions.editMeetingError, (state, { error }) => ({ ...state, loading: false, error })),
    on(MeetingActions.deleteMeeting, (state, { meeting }) => ({ ...state, meeting, loading: true, error: ''})),
    on(MeetingActions.deleteMeetingSuccess, (state) => ({ ...state, loading: false })),
    on(MeetingActions.deleteMeetingError, (state, { error }) => ({ ...state, loading: false, error })),
);

export function meetingReducer(state: MeetingState | undefined, action: Action) {
    return reducer(state, action);
}
