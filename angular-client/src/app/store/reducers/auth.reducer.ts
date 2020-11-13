import {Action, createReducer, on } from '@ngrx/store';

import * as AuthActions from '../actions/auth.actions';
import { Auth } from '../models/auth.model';

export interface State {
    loading: boolean;
    email: string;
    password: string;
    authenticatedUser: Auth;
    error: string;
    isAuthenticated: boolean;
}

export const initialState: State = {
    loading: false,
    email: '',
    password: '',
    authenticatedUser: null,
    error: '',
    isAuthenticated: false
};

const reducer = createReducer(
    initialState,
    on(AuthActions.auth, (state, { email, password }) => ({ ...state, loading: true, email, password , error: ''})),
    on(AuthActions.authSuccess, (state, { authenticatedUser }) => ({ ...state, loading: false, authenticatedUser, isAuthenticated: true })),
);

export function authReducer(state: State | undefined, action: Action) {
    return reducer(state, action);
}
