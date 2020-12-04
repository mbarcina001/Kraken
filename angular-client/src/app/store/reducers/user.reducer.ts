import {Action, createReducer, on } from '@ngrx/store';

import * as UserActions from '../actions/user.actions';
import { Role, User } from '../models/user.model';

export interface UserState {
    loading: boolean;
    userId: number;
    users: User[];
    roles: Role[];
    error: string;
}

export const initialState: UserState = {
    loading: false,
    userId: -1,
    users: [],
    roles: [],
    error: '',
};

const reducer = createReducer(
    initialState,
    on(UserActions.getUsers, (state) => ({ ...state, loading: true, error: ''})),
    on(UserActions.getUsersSuccess, (state, { users }) => ({ ...state, loading: false, users })),
    on(UserActions.getRoles, (state) => ({ ...state, loading: true, error: ''})),
    on(UserActions.getRolesSuccess, (state, { roles }) => ({ ...state, loading: false, roles })),
);

export function userReducer(state: UserState | undefined, action: Action) {
    return reducer(state, action);
}
