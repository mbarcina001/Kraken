import { Action, createReducer, on } from '@ngrx/store';

import * as AuthActions from '../actions/auth.actions';
import { AuthRequest } from '../models/auth-request.model';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';

export interface AuthState {
    loading: boolean;
    loginRequest: AuthRequest;
    registerRequest: User;
    authenticatedUser: Auth;
    error: string;
    isAuthenticated: boolean;
}

export const initialState: AuthState = {
    loading: false,
    loginRequest: null,
    registerRequest: null,
    authenticatedUser: null,
    error: '',
    isAuthenticated: false
};

const reducer = createReducer(
    initialState,
    on(AuthActions.auth, (state, { loginRequest }) => ({ ...state, loading: true, loginRequest, error: ''})),
    on(AuthActions.authSuccess, (state, { authenticatedUser }) => ({ ...state, loading: false, authenticatedUser, isAuthenticated: true })),
    on(AuthActions.authError, (state, { error }) => ({ ...state, loading: false, error })),
    on(AuthActions.register, (state, { registerRequest }) => ({ ...state, loading: true, registerRequest, error: ''})),
    on(AuthActions.registerSuccess, (state) => ({ ...state, loading: false, error: null })),
    on(AuthActions.registerError, (state, { error }) => ({ ...state, loading: false, error })),
    on(AuthActions.logout, (state, {}) => ({ ...state })),
    on(AuthActions.logoutSuccess, (state, {}) => ({ ...state, authenticatedUser: null, isAuthenticated: false })),
);

export function authReducer(state: AuthState | undefined, action: Action) {
    return reducer(state, action);
}
