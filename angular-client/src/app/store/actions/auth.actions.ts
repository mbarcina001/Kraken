import { createAction, props } from '@ngrx/store';
import { Auth } from '../models/auth.model';
import { ACTION_AUTH_LOGIN, ACTION_AUTH_LOGIN_SUCCESS } from '../store.constants';

export const auth = createAction(ACTION_AUTH_LOGIN, props<{email: string, password: string}>());
export const authSuccess = createAction(ACTION_AUTH_LOGIN_SUCCESS, props<{authenticatedUser: Auth}>());
