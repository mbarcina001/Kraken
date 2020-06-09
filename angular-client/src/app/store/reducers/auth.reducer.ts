import {Action, createReducer, on } from '@ngrx/store';

import * as AuthActions from '../actions/auth.actions';
import { Auth } from '../models/auth.model';

export interface State {
    loading: boolean;
    email: string;
    password: string;
    authResult: Auth;
    error: string;
    isAuthenticated: boolean;
}

export const initialState: State = {
    loading: false,
    email: '',
    password: '',
    authResult: null,
    error: '',
    isAuthenticated: false
};

const reducer = createReducer(
    initialState,
    on(AuthActions.auth, (state, { email, password }) => ({ ...state, loading: true, email, password , error: ''})),
    on(AuthActions.authSuccess, (state, { authResult }) => ({ ...state, loading: false, authResult, isAuthenticated: true })),
);

export function authReducer(state: State | undefined, action: Action) {
    return reducer(state, action);
}
