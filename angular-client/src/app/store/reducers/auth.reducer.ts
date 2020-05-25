import {Action, createReducer, on } from '@ngrx/store';

import * as AuthActions from '../actions/auth.actions';
import { Auth } from '../models/auth.model';

export interface State {
    loading: boolean;
    email: string;
    password: string;
    auth: Auth;
    error: string;
}

export const initialState: State = {
    loading: false,
    email: '',
    password: '',
    auth: null,
    error: ''
};

const authReducer = createReducer(
    initialState,
    on(AuthActions.auth, (state, { email, password }) => ({ ...state, loading: true, email, password , error: ''})),
    on(AuthActions.authSuccess, (state, { authResult }) => ({ ...state, loading: false, authResult })),
);

export function reducer(state: State | undefined, action: Action) {
    return authReducer(state, action);
}
