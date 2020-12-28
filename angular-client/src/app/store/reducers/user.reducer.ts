import {Action, createReducer, on } from '@ngrx/store';

import * as UserActions from '../actions/user.actions';
import { Attendant } from '../models/attendants.model';
import { Role, User } from '../models/user.model';

export interface UserState {
    loading: boolean;
    user: User;
    users: User[];
    attendants: Attendant[];
    roles: Role[];
    forceLogout: boolean;
    error: string;
}

export const initialState: UserState = {
    loading: false,
    user: null,
    users: [],
    attendants: [],
    roles: [],
    forceLogout: false,
    error: '',
};

const reducer = createReducer(
    initialState,
    on(UserActions.getUsers, (state) => ({ ...state, loading: true, error: ''})),
    on(UserActions.getUsersSuccess, (state, { users }) => ({ ...state, loading: false, users })),
    on(UserActions.getUsersError, (state, { error }) => ({ ...state, loading: false, error })),
    on(UserActions.getAttendants, (state) => ({ ...state, loading: true, error: ''})),
    on(UserActions.getAttendantsSuccess, (state, { attendants }) => ({ ...state, loading: false, attendants })),
    on(UserActions.getAttendantsError, (state, { error }) => ({ ...state, loading: false, error })),
    on(UserActions.getRoles, (state) => ({ ...state, loading: true, error: ''})),
    on(UserActions.getRolesSuccess, (state, { roles }) => ({ ...state, loading: false, roles })),
    on(UserActions.getRolesError, (state, { error }) => ({ ...state, loading: false, error })),
    on(UserActions.createUser, (state, { user }) => ({ ...state, user, loading: true, error: ''})),
    on(UserActions.createUserSuccess, (state, { users }) => ({ ...state, loading: false, users })),
    on(UserActions.createUserError, (state, { error }) => ({ ...state, loading: false, error })),
    on(UserActions.editUser, (state, { user, forceLogout }) => ({ ...state, user, forceLogout, loading: true, error: ''})),
    on(UserActions.editUserSuccess, (state, { users }) => ({ ...state, loading: false, users })),
    on(UserActions.editUserSuccessForceLogout, (state, { users }) => ({ ...state, loading: false, users })),
    on(UserActions.editUserError, (state, { error }) => ({ ...state, loading: false, error })),
    on(UserActions.deleteUser, (state, { user, forceLogout }) => ({ ...state, user, forceLogout, loading: true, error: ''})),
    on(UserActions.deleteUserSuccess, (state, { users }) => ({ ...state, loading: false, users })),
    on(UserActions.deleteUserSuccessForceLogout, (state, { users }) => ({ ...state, loading: false, users })),
    on(UserActions.deleteUserError, (state, { error }) => ({ ...state, loading: false, error })),
);

export function userReducer(state: UserState | undefined, action: Action) {
    return reducer(state, action);
}
