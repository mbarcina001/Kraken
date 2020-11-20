import {Action, createReducer, on } from '@ngrx/store';

import * as UserActions from '../actions/user.actions';
import { Meeting } from '../models/meeting.model';
import { User } from '../models/user.model';

export interface State {
    loading: boolean;
    userId: number;
    users: User[];
    meetings: Meeting[];
    error: string;
}

export const initialState: State = {
    loading: false,
    userId: -1,
    users: [],
    meetings: [],
    error: '',
};

const reducer = createReducer(
    initialState,
    on(UserActions.getUserMeetings, (state) => ({ ...state, loading: true, error: ''})),
    on(UserActions.getUserMeetingsSuccess, (state, { meetings }) => ({ ...state, loading: false, meetings })),
    on(UserActions.getUsers, (state) => ({ ...state, loading: true, error: ''})),
    on(UserActions.getUsersSuccess, (state, { users }) => ({ ...state, loading: false, users })),
);

export function userReducer(state: State | undefined, action: Action) {
    return reducer(state, action);
}
