import { Action, createReducer, on } from '@ngrx/store';

import * as AuthActions from '../actions/auth.actions';
import { AuthRequest } from '../models/auth-request.model';
import { Auth } from '../models/auth.model';

export interface AuthState {
    loading: boolean;
    loginRequest: AuthRequest;
    authenticatedUser: Auth;
    error: string;
    isAuthenticated: boolean;
}

export const initialState: AuthState = {
    loading: false,
    loginRequest: null,
    authenticatedUser: null,
    error: '',
    isAuthenticated: false
};

const reducer = createReducer(
    initialState,
    on(AuthActions.auth, (state, { loginRequest }) => ({ ...state, loading: true, loginRequest, error: ''})),
    on(AuthActions.authSuccess, (state, { authenticatedUser }) => ({ ...state, loading: false, authenticatedUser, isAuthenticated: true })),
    on(AuthActions.authError, (state, { error }) => ({ ...state, loading: false, error })),
);

export function authReducer(state: AuthState | undefined, action: Action) {
    return reducer(state, action);
}
