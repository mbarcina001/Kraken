import { createAction, props } from '@ngrx/store';
import { AuthRequest } from '../models/auth-request.model';
import { Auth } from '../models/auth.model';
import { ACTION_AUTH_LOGIN, ACTION_AUTH_LOGIN_ERROR, ACTION_AUTH_LOGIN_SUCCESS } from '../store.constants';

export const auth = createAction(ACTION_AUTH_LOGIN, props<{loginRequest: AuthRequest}>());
export const authSuccess = createAction(ACTION_AUTH_LOGIN_SUCCESS, props<{authenticatedUser: Auth}>());
export const authError = createAction(ACTION_AUTH_LOGIN_ERROR, props<{error: any}>());
