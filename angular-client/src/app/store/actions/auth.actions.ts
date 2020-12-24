import { createAction, props } from '@ngrx/store';
import { AuthRequest } from '../models/auth-request.model';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { ACTION_AUTH_LOGIN, ACTION_AUTH_LOGIN_ERROR, ACTION_AUTH_LOGIN_SUCCESS, ACTION_AUTH_LOGOUT,
    ACTION_AUTH_LOGOUT_SUCCESS, ACTION_AUTH_REGISTER, ACTION_AUTH_REGISTER_ERROR, ACTION_AUTH_REGISTER_SUCCESS
} from '../store.constants';

export const auth = createAction(ACTION_AUTH_LOGIN, props<{ loginRequest: AuthRequest }>());
export const authSuccess = createAction(ACTION_AUTH_LOGIN_SUCCESS, props<{ authenticatedUser: Auth }>());
export const authError = createAction(ACTION_AUTH_LOGIN_ERROR, props<{ error: any }>());

export const register = createAction(ACTION_AUTH_REGISTER, props<{ registerRequest: User }>());
export const registerSuccess = createAction(ACTION_AUTH_REGISTER_SUCCESS);
export const registerError = createAction(ACTION_AUTH_REGISTER_ERROR, props<{ error: any }>());

export const logout = createAction(ACTION_AUTH_LOGOUT);
export const logoutSuccess = createAction(ACTION_AUTH_LOGOUT_SUCCESS);
